export const shuffle = <T>(arr: T[]): T[] => {
  let copy = [...arr]
  let result: T[] = []

  while (copy.length > 0) {
    const rand = Math.floor(Math.random() * copy.length)
    result.push(copy[rand])
    copy.splice(rand, 1)
  }

  return result
}

export const frequencies = (arr: string[]): Record<string, number> =>
  arr.reduce((groups, el) => {
    groups[el] = (groups[el] || 0) + 1
    return groups
  }, {} as Record<string, number>)

export const zip = <T>(arr: T[], ...others: T[][]): T[][] =>
  arr.map((v, i) => [v, ...others.map((o) => o[i])])
