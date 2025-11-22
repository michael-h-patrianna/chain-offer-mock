import './ParameterGroup.css'

interface ParameterGroupProps {
  title: string
  children: React.ReactNode
}

export function ParameterGroup({ title, children }: ParameterGroupProps) {
  return (
    <div className='parameter-group'>
      <h3 className='parameter-group__title'>{title}</h3>
      <div className='parameter-group__content'>{children}</div>
    </div>
  )
}
