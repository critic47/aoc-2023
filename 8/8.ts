const [_directions, _, ...rest] = (await Deno.readTextFile('./8/input.txt')).split('\n')
const directions = [..._directions]

const map: Record<string, { L: string; R: string }> = {}
rest.forEach((line) => {
  const [_, key, left, right] = line.match(/(\w+) = \((\w+), (\w+)\)/) || []
  map[key] = { L: left, R: right }
})

let current = 'AAA'
let steps = 0
while (current !== 'ZZZ') {
  const currentDirection = directions[steps % directions.length] as 'L' | 'R'
  current = map[current][currentDirection]
  steps++
}

console.log(steps)
