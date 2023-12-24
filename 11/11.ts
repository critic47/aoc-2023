const input = (await Deno.readTextFile('./11/input.txt')).split('\n').map((line) => line.split(''))

const transpose = (m: string[][]) => [...m[0]].map((_, i) => [...m].map((r) => r[i]))
const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

const addExpansion = (grid: string[][]) =>
  grid.flatMap((row) => {
    if (row.every((char) => char === '.')) {
      return [row, row]
    }
    return [row]
  })

const grid = transpose(addExpansion(transpose(addExpansion(input))))
let galaxies: { x: number; y: number }[] = []
grid.forEach((row, y) =>
  row.forEach((char, x) => {
    if (char === '#') {
      galaxies.push({ x, y })
    }
  })
)
let totalDistance = 0
for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    totalDistance += distance(galaxies[i], galaxies[j])
  }
}
console.log(totalDistance)

// part 2
const yExpansions: number[] = []
const xExpansions: number[] = []
const calculateExpansion = (grid: string[][], expansionsArray: number[]) => {
  grid.forEach((row, n) => {
    if (row.every((char) => char === '.')) {
      expansionsArray.push(n)
    }
  })
}
calculateExpansion(input, yExpansions)
calculateExpansion(transpose(input), xExpansions)
galaxies = []
input.forEach((row, y) =>
  row.forEach((char, x) => {
    if (char === '#') {
      galaxies.push({ x, y })
    }
  })
)
totalDistance = 0
for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    const yEx = yExpansions.filter(
      (n) => n > Math.min(galaxies[i].y, galaxies[j].y) && n < Math.max(galaxies[i].y, galaxies[j].y)
    ).length
    const xEx = xExpansions.filter(
      (n) => n > Math.min(galaxies[i].x, galaxies[j].x) && n < Math.max(galaxies[i].x, galaxies[j].x)
    ).length
    totalDistance += distance(galaxies[i], galaxies[j]) + yEx * 999999 + xEx * 999999
  }
}
console.log(totalDistance)
