import './ParameterSlider.css'

interface ParameterSliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  description?: string
}

export function ParameterSlider({ label, value, min, max, step, onChange, description }: ParameterSliderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value))
  }

  return (
    <div className='parameter-slider'>
      <div className='parameter-slider__header'>
        <label className='parameter-slider__label'>{label}</label>
        <span className='parameter-slider__value'>{value.toFixed(step >= 1 ? 0 : step >= 0.1 ? 1 : 2)}</span>
      </div>
      {description && <p className='parameter-slider__description'>{description}</p>}
      <input
        type='range'
        className='parameter-slider__input'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      <div className='parameter-slider__range'>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
