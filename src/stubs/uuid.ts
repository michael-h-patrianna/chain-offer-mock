export function validate(val: string): boolean {
  return /^[0-9a-fA-F-]{32,36}$/.test(val)
}
