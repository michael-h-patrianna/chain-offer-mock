declare module '*.module.scss' {
  const classes: Record<string, string>
  export default classes
}
declare module '*.scss' {
  const classes: Record<string, string>
  export default classes
}
declare module '*.json' {
  const value: unknown
  export default value
}
