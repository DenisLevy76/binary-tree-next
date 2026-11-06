export function randomTree(nodeNumbers: number): number[] {
  const values = Array.from({ length: 99 }, (_, index) => index + 1)
  for (let index = values.length - 1; index > 0; index--) {
    const position = Math.floor(Math.random() * (index + 1))
    ;[values[index], values[position]] = [values[position], values[index]]
  }
  return values.slice(0, Math.max(0, Math.min(63, Math.floor(nodeNumbers))))
}
