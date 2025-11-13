declare module '*.module.scss' {
  const classes: Record<string, string>
  export default classes
}
declare module '*.scss' {
  const classes: Record<string, string>
  export default classes
}
declare module '*.json' {
  const value: any
  export default value
}
