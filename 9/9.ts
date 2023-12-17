const input = (await Deno.readTextFile('./9/input.txt')).split('\n')

const results = input.map((line) => {
  const numbers = Array.from(line.matchAll(/(-?\d+)/g)).map((n) => parseInt(n[0]))
  const levels = [numbers]
  while (!levels.at(-1)?.every((v) => v === 0)) {
    const level = levels.at(-1) ?? []
    const nextLevel = level.flatMap((n, i, arr) => {
      if (i === 0) {
        return []
      }
      return [n - arr[i - 1]]
    })
    levels.push(nextLevel)
  }
  for (let i = levels.length - 1; i > 0; i--) {
    const level = levels[i]
    const previousLevel = levels[i - 1]
    previousLevel.push((level?.at(-1) ?? 0) + (previousLevel?.at(-1) ?? 0))
  }
  return levels[0].at(-1) ?? 0
})
console.log(results.reduce((acc, cur) => acc + cur, 0))

// part 2
const results2 = input.map((line) => {
  const numbers = Array.from(line.matchAll(/(-?\d+)/g)).map((n) => parseInt(n[0]))
  const levels = [numbers]
  while (!levels.at(-1)?.every((v) => v === 0)) {
    const level = levels.at(-1) ?? []
    const nextLevel = level.flatMap((n, i, arr) => {
      if (i === 0) {
        return []
      }
      return [n - arr[i - 1]]
    })
    levels.push(nextLevel)
  }
  for (let i = levels.length - 1; i > 0; i--) {
    const level = levels[i]
    const previousLevel = levels[i - 1]
    previousLevel.unshift((previousLevel?.at(0) ?? 0) - (level?.at(0) ?? 0))
  }
  return levels[0].at(0) ?? 0
})
console.log(results2.reduce((acc, cur) => acc + cur, 0))
