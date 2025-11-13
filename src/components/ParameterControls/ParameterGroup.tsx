import './ParameterGroup.css'

interface ParameterGroupProps {
  title: string
  icon?: string
  children: React.ReactNode
}

export function ParameterGroup({ title, icon, children }: ParameterGroupProps) {
  return (
    <div className="parameter-group">
      <h3 className="parameter-group__title">
        {icon && <span className="parameter-group__icon">{icon}</span>}
        {title}
      </h3>
      <div className="parameter-group__content">{children}</div>
    </div>
  )
}
