export function randomTree(nodeNumbers: number): number[] {
  const randomList = []

  for(let i = 0; i < nodeNumbers; i++){
    randomList.push(Math.floor(Math.random() * 99) + 1)
  }

  return randomList
}
