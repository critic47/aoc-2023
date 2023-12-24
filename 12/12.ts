const input = (await Deno.readTextFile('./12/input.txt')).split('\n').map((line) => line.split(' '))
const cache: Record<string, number> = {}

function trimStart(str: string) {
  return str.startsWith('.')
    ? str
        .split(/(?<=\.)(?=[^.])/)
        .slice(1)
        .join('')
    : str
}

function findCombinations(row: string, groups: number[]): number {
  const line = row + ' ' + groups.join(',')
  if (cache[line]) return cache[line]
  if (groups.length <= 0) return Number(!row.includes('#'))
  if (row.length < groups.reduce((a, b) => a + b) + groups.length - 1) return 0
  const damagedOrUnknown = !row.slice(0, groups[0]).includes('.')
  if (row.length == groups[0]) return Number(damagedOrUnknown)
  return (cache[line] ??=
    (row[0] != '#' ? findCombinations(trimStart(row.slice(1)), groups) : 0) +
    (damagedOrUnknown && row[groups[0]] != '#'
      ? findCombinations(trimStart(row.slice(groups[0] + 1)), groups.slice(1))
      : 0))
}

const result = input.reduce((acc, line) => {
  const [row, groups] = [line[0], line[1].split(',').map((n) => parseInt(n))]
  return acc + findCombinations(row, groups)
}, 0)

console.log(result)

// part 2
const result2 = input.reduce((acc, line) => {
  const [newRow, newGroups] = [Array(5).fill(line[0]).join('?'), Array(5).fill(line[1]).join(',')]
  const [row, groups] = [newRow, newGroups.split(',').map((n) => parseInt(n))]
  return acc + findCombinations(row, groups)
}, 0)

console.log(result2)
