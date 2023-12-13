const [_seeds, ..._rest] = (await Deno.readTextFile('./5/input.txt')).split('\n\n')

const seeds = _seeds.match(/(\d+)/g)?.map((n) => parseInt(n)) ?? []

type categoryMap = {
  sourceCategory: string
  destinationCategory: string
  rangeMap: { source: number; destination: number; range: number }[]
}

const mappings = new Map<string, categoryMap>()
_rest.forEach((line) => {
  const [category, ...ranges] = line.split('\n')
  const [sourceCategory, _, destinationCategory] = category.match(/(\w+)/g) ?? []
  const rangeMap = ranges.map((row) => {
    const [destination, source, range] = row.match(/(\d+)/g)?.map((r) => parseInt(r)) ?? []
    return { source, destination, range }
  })

  mappings.set(sourceCategory ?? '', {
    sourceCategory: sourceCategory ?? '',
    destinationCategory,
    rangeMap,
  })
})

const getLocation = (source: number, sourceCategory: string): number => {
  const mapping = mappings.get(sourceCategory)
  if (!mapping) {
    return source
  }
  const { destinationCategory, rangeMap } = mapping
  let destination = source
  for (const r of rangeMap) {
    if (source >= r.source && source <= r.source + (r.range - 1)) {
      destination = r.destination + (source - r.source)
      break
    }
  }
  return getLocation(destination, destinationCategory)
}

console.log(Math.min(...seeds.map((s) => getLocation(s, 'seed'))))

// part 2
const newSeeds = (_seeds.match(/(\d+)/g)?.map((n) => parseInt(n)) ?? []).flatMap((_, i, a) =>
  i % 2 ? [] : [a.slice(i, i + 2)]
)
const r = newSeeds.map((row) => {
  console.log(row)
  const [start, range] = row
  let min = Infinity
  for (let i = start; i < start + range; i++) {
    min = Math.min(min, getLocation(i, 'seed'))
  }
  return min
})
console.log(Math.min(...r))
