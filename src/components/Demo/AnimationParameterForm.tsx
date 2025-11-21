import { Download, Play, RotateCcw, Upload } from 'lucide-react'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { AnimationType } from '../../animations/revealAnimations'
import { useAnimationParameters } from '../../hooks/useAnimationParameters'
import {
  baseParameterConfigs,
  orbitalParameterConfigs,
  springParameterConfigs,
  wobbleParameterConfigs,
} from '../../types/animationParameters'
import './AnimationParameterForm.css'
import { ParameterGroup } from './ParameterControls/ParameterGroup'
import { ParameterSlider } from './ParameterControls/ParameterSlider'

interface AnimationParameterFormProps {
  animationType: AnimationType
  onAnimationTypeChange?: (animationType: AnimationType) => void
}

export function AnimationParameterForm({ animationType, onAnimationTypeChange }: AnimationParameterFormProps) {
  const {
    getParameters,
    updateParameter,
    updateSpringParameter,
    updateWobbleParameter,
    updateOrbitalParameter,
    resetToDefaults,
    getAllParameters,
    setAllParameters
  } = useAnimationParameters()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const parameters = getParameters(animationType)

  // Updated logic to show parameters for all animations that use them
  const isSpringAnimation = ['spring-physics', 'silk-unfold', 'orbital-reveal', 'elastic-bounce'].includes(animationType)
  // Crystal Shimmer and Glitch Snap use keyframe arrays for scale, so they respond to wobble intensity.
  const isWobbleAnimation = ['elastic-bounce', 'scale-rotate', 'glitch-snap', 'crystal-shimmer'].includes(animationType)
  const isOrbitalAnimation = animationType === 'orbital-reveal'

  const isNoneAnimation = animationType === 'none'

  const handleReset = () => {
    resetToDefaults(animationType)
  }

  const handleExport = async () => {
    const currentParams = getParameters(animationType)
    const exportData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      animationType: animationType,
      parameters: currentParams
    }

    const jsonString = JSON.stringify(exportData, null, 2)
    const suggestedName = `animation-parameters-${animationType}-${Date.now()}.json`

    // Try using File System Access API for "Save As" dialog
    if ('showSaveFilePicker' in window) {
      try {
        console.log('[Export] Using File System Access API')
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName,
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] }
          }]
        })

        console.log('[Export] File selected, writing...', fileHandle.name)
        const writable = await fileHandle.createWritable()
        await writable.write(jsonString)
        await writable.close()
        console.log('[Export] File written successfully')
        toast.success(`Parameters exported to "${fileHandle.name}"!`)
        return // Success!
      } catch (error) {
        // User cancelled or error occurred with File System Access API
        if (error instanceof Error && error.name === 'AbortError') {
          // User cancelled, don't show error
          console.log('[Export] User cancelled file save')
          return
        }
        // If there was an error (not cancellation), fall through to fallback
        console.error('[Export] File System Access API failed, using fallback:', error)
      }
    }

    // Fallback: Direct download (works in all browsers)
    console.log('[Export] Using fallback download method')
    try {
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = suggestedName
      link.style.display = 'none'
      document.body.appendChild(link)
      console.log('[Export] Triggering download for:', suggestedName)
      link.click()

      // Cleanup after a short delay
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)

      console.log('[Export] Download triggered successfully')
      toast.success(`Parameters exported to "${suggestedName}"!`)
    } catch (error) {
      console.error('[Export] Fallback download failed:', error)
      toast.error('Error exporting file: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importData = JSON.parse(content)

        // Validate the imported data structure
        if (!importData.animationType || !importData.parameters) {
          toast.error('Invalid file format: missing animationType or parameters')
          return
        }

        // Check if the animation type matches
        const targetAnimationType = importData.animationType
        if (targetAnimationType !== animationType) {
          // Switch to the imported animation type automatically
          if (onAnimationTypeChange) {
            onAnimationTypeChange(targetAnimationType)
          } else {
            toast.error('Cannot switch animation type: callback not provided')
            return
          }
        }

        // Apply the imported parameters to the target animation type
        const params = importData.parameters

        // Update base parameters
        if (params.durationScale !== undefined) updateParameter(targetAnimationType, 'durationScale', params.durationScale)
        if (params.delayOffset !== undefined) updateParameter(targetAnimationType, 'delayOffset', params.delayOffset)
        if (params.staggerChildren !== undefined) updateParameter(targetAnimationType, 'staggerChildren', params.staggerChildren)
        if (params.delayChildren !== undefined) updateParameter(targetAnimationType, 'delayChildren', params.delayChildren)

        // Update spring parameters if present
        if (params.spring) {
          if (params.spring.stiffness !== undefined) updateSpringParameter(targetAnimationType, 'stiffness', params.spring.stiffness)
          if (params.spring.damping !== undefined) updateSpringParameter(targetAnimationType, 'damping', params.spring.damping)
          if (params.spring.mass !== undefined) updateSpringParameter(targetAnimationType, 'mass', params.spring.mass)
        }

        // Update wobble parameters if present
        if (params.wobble?.wobbleIntensity !== undefined) {
          updateWobbleParameter(targetAnimationType, 'wobbleIntensity', params.wobble.wobbleIntensity)
        }

        // Update orbital parameters if present
        if (params.orbital?.orbitDistance !== undefined) {
          updateOrbitalParameter(targetAnimationType, 'orbitDistance', params.orbital.orbitDistance)
        }

        toast.success(`Parameters imported for "${targetAnimationType}"!`)
      } catch (error) {
        toast.error('Error importing file: ' + (error instanceof Error ? error.message : 'Invalid JSON'))
      }
    }
    reader.readAsText(file)

    // Reset file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (isNoneAnimation) {
    return (
      <div className="animation-parameter-form">
        <div className="animation-parameter-form__header">
          <h2 className="animation-parameter-form__title">Parameters</h2>
        </div>
        <p className="animation-parameter-form__empty">
          No parameters available for "No Animation" mode.
        </p>
      </div>
    )
  }

  return (
    <div className="animation-parameter-form">
      <div className="animation-parameter-form__header">
        <h2 className="animation-parameter-form__title">Parameters</h2>
        <div className="animation-parameter-form__actions">
          <button
            className="animation-parameter-form__action-button"
            onClick={handleExport}
            title="Export parameters to JSON file"
          >
            <Download size={16} />
          </button>
          <button
            className="animation-parameter-form__action-button"
            onClick={handleImport}
            title="Import parameters from JSON file"
          >
            <Upload size={16} />
          </button>
          <button
            className="animation-parameter-form__action-button"
            onClick={handleReset}
            title="Reset to defaults"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <ParameterGroup title="Timing">
        <ParameterSlider
          key={`${animationType}-durationScale`}
          label={baseParameterConfigs[0].label}
          value={parameters.durationScale}
          min={baseParameterConfigs[0].min}
          max={baseParameterConfigs[0].max}
          step={baseParameterConfigs[0].step}
          description={baseParameterConfigs[0].description}
          onChange={(value) => updateParameter(animationType, 'durationScale', value)}
        />
        <ParameterSlider
          key={`${animationType}-delayOffset`}
          label={baseParameterConfigs[1].label}
          value={parameters.delayOffset}
          min={baseParameterConfigs[1].min}
          max={baseParameterConfigs[1].max}
          step={baseParameterConfigs[1].step}
          description={baseParameterConfigs[1].description}
          onChange={(value) => updateParameter(animationType, 'delayOffset', value)}
        />
      </ParameterGroup>

      <ParameterGroup title="Stagger Effect" >
        <ParameterSlider
          key={`${animationType}-staggerChildren`}
          label={baseParameterConfigs[2].label}
          value={parameters.staggerChildren}
          min={baseParameterConfigs[2].min}
          max={baseParameterConfigs[2].max}
          step={baseParameterConfigs[2].step}
          description={baseParameterConfigs[2].description}
          onChange={(value) => updateParameter(animationType, 'staggerChildren', value)}
        />
        <ParameterSlider
          key={`${animationType}-delayChildren`}
          label={baseParameterConfigs[3].label}
          value={parameters.delayChildren}
          min={baseParameterConfigs[3].min}
          max={baseParameterConfigs[3].max}
          step={baseParameterConfigs[3].step}
          description={baseParameterConfigs[3].description}
          onChange={(value) => updateParameter(animationType, 'delayChildren', value)}
        />
      </ParameterGroup>

      {isSpringAnimation && parameters.spring && (
        <ParameterGroup title="Spring Physics" >
          <ParameterSlider
            key={`${animationType}-stiffness`}
            label={springParameterConfigs[0].label}
            value={parameters.spring.stiffness}
            min={springParameterConfigs[0].min}
            max={springParameterConfigs[0].max}
            step={springParameterConfigs[0].step}
            description={springParameterConfigs[0].description}
            onChange={(value) => updateSpringParameter(animationType, 'stiffness', value)}
          />
          <ParameterSlider
            key={`${animationType}-damping`}
            label={springParameterConfigs[1].label}
            value={parameters.spring.damping}
            min={springParameterConfigs[1].min}
            max={springParameterConfigs[1].max}
            step={springParameterConfigs[1].step}
            description={springParameterConfigs[1].description}
            onChange={(value) => updateSpringParameter(animationType, 'damping', value)}
          />
          <ParameterSlider
            key={`${animationType}-mass`}
            label={springParameterConfigs[2].label}
            value={parameters.spring.mass}
            min={springParameterConfigs[2].min}
            max={springParameterConfigs[2].max}
            step={springParameterConfigs[2].step}
            description={springParameterConfigs[2].description}
            onChange={(value) => updateSpringParameter(animationType, 'mass', value)}
          />
        </ParameterGroup>
      )}

      {isWobbleAnimation && parameters.wobble && (
        <ParameterGroup title="Wobble Effect" >
          <ParameterSlider
            key={`${animationType}-wobbleIntensity`}
            label={wobbleParameterConfigs[0].label}
            value={parameters.wobble.wobbleIntensity}
            min={wobbleParameterConfigs[0].min}
            max={wobbleParameterConfigs[0].max}
            step={wobbleParameterConfigs[0].step}
            description={wobbleParameterConfigs[0].description}
            onChange={(value) => updateWobbleParameter(animationType, 'wobbleIntensity', value)}
          />
        </ParameterGroup>
      )}

      {isOrbitalAnimation && parameters.orbital && (
        <ParameterGroup title="Orbital Motion" >
          <ParameterSlider
            key={`${animationType}-orbitDistance`}
            label={orbitalParameterConfigs[0].label}
            value={parameters.orbital.orbitDistance}
            min={orbitalParameterConfigs[0].min}
            max={orbitalParameterConfigs[0].max}
            step={orbitalParameterConfigs[0].step}
            description={orbitalParameterConfigs[0].description}
            onChange={(value) => updateOrbitalParameter(animationType, 'orbitDistance', value)}
          />
        </ParameterGroup>
      )}
    </div>
  )
}
