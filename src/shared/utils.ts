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

export const frequencies = <T>(arr: T[]): Map<T, number> =>
  arr.reduce((groups, el) => groups.set(el, (groups.get(el) || 0) + 1), new Map<T, number>())

export const zip = <T>(arr: T[], ...others: T[][]): T[][] =>
  arr.map((v, i) => [v, ...others.map((o) => o[i])])
