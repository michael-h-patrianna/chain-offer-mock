import { AnimationType } from '../animations/revealAnimations'
import { useAnimationParameters } from '../hooks/useAnimationParameters'
import {
  baseParameterConfigs,
  springParameterConfigs,
  wobbleParameterConfigs,
  orbitalParameterConfigs,
} from '../types/animationParameters'
import './AnimationParameterForm.css'
import { ParameterGroup } from './ParameterControls/ParameterGroup'
import { ParameterSlider } from './ParameterControls/ParameterSlider'

interface AnimationParameterFormProps {
  animationType: AnimationType
}

export function AnimationParameterForm({ animationType }: AnimationParameterFormProps) {
  const { getParameters, updateParameter, updateSpringParameter, updateWobbleParameter, updateOrbitalParameter, resetToDefaults } =
    useAnimationParameters()

  const parameters = getParameters(animationType)
  const isSpringAnimation = animationType === 'spring-physics'
  const isWobbleAnimation = animationType === 'elastic-bounce'
  const isOrbitalAnimation = animationType === 'orbital-reveal'
  const isNoneAnimation = animationType === 'none'

  const handleReset = () => {
    resetToDefaults(animationType)
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
        <button className="animation-parameter-form__reset" onClick={handleReset}>
          Reset
        </button>
      </div>

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
