const [_directions, _, ...rest] = (await Deno.readTextFile('./8/input.txt')).split('\n')
const directions = [..._directions]

const map: Record<string, { L: string; R: string }> = {}
rest.forEach((line) => {
  const [_, key, left, right] = line.match(/(\w+) = \((\w+), (\w+)\)/) || []
  map[key] = { L: left, R: right }
})

let current = Object.keys(map).filter((k) => k.endsWith('A'))
const minSteps = Array.from(Array(current.length))

let steps = 0
while (!current.reduce((acc, cur) => acc && cur.endsWith('Z'), true)) {
  current = current.map((c, index) => {
    if (c.endsWith('Z') && minSteps[index] === undefined) {
      minSteps[index] = steps
    }
    const currentDirection = directions[steps % directions.length] as 'L' | 'R'
    return map[c][currentDirection]
  })
  if (minSteps.reduce((acc, cur) => acc && cur !== undefined, true)) {
    break
  }
  steps++
}

const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b)
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)

console.log(minSteps.reduce(lcm))
