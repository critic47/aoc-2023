const input = (await Deno.readTextFile('./10/input.txt')).split('\n')

type Point = {
  x: number
  y: number
}

let start: Point = { x: 0, y: 0 }
const grid: string[][] = []
input.forEach((line, y) => {
  grid[y] = []
  line.split('').forEach((char, x) => {
    grid[y][x] = char
    if (char === 'S') {
      start = { x, y }
    }
  })
})

const loop: Point[] = [start]
const startAdjacents = {
  up: { x: start.x, y: start.y - 1, value: grid[start.y - 1]?.[start.x] },
  down: { x: start.x, y: start.y + 1, value: grid[start.y + 1]?.[start.x] },
  left: { x: start.x - 1, y: start.y, value: grid[start.y]?.[start.x - 1] },
  right: { x: start.x + 1, y: start.y, value: grid[start.y]?.[start.x + 1] },
}
if (startAdjacents.up.value === '|' || startAdjacents.up.value === '7' || startAdjacents.up.value === 'F') {
  loop.push(startAdjacents.up)
} else if (
  startAdjacents.down.value === '|' ||
  startAdjacents.down.value === 'J' ||
  startAdjacents.down.value === 'L'
) {
  loop.push(startAdjacents.down)
} else if (
  startAdjacents.left.value === '-' ||
  startAdjacents.left.value === 'L' ||
  startAdjacents.left.value === 'F'
) {
  loop.push(startAdjacents.left)
} else if (
  startAdjacents.right.value === '-' ||
  startAdjacents.right.value === 'J' ||
  startAdjacents.right.value === '7'
) {
  loop.push(startAdjacents.right)
}

let index = 0
const step = () => {
  const currentPoint = loop.at(-1) as Point
  const previousPoint = loop.at(-2) as Point
  const currentValue = grid[currentPoint.y]?.[currentPoint.x]

  if (currentValue === 'S') {
    return false
  } else if (currentValue === '|') {
    loop.push({ x: currentPoint.x, y: currentPoint.y - (previousPoint.y - currentPoint.y) })
  } else if (currentValue === '-') {
    loop.push({ x: currentPoint.x - (previousPoint.x - currentPoint.x), y: currentPoint.y })
  } else if (currentValue === 'L') {
    if (previousPoint.y < currentPoint.y) {
      loop.push({ x: currentPoint.x + 1, y: currentPoint.y })
    } else {
      loop.push({ x: currentPoint.x, y: currentPoint.y - 1 })
    }
  } else if (currentValue === 'J') {
    if (previousPoint.y < currentPoint.y) {
      loop.push({ x: currentPoint.x - 1, y: currentPoint.y })
    } else {
      loop.push({ x: currentPoint.x, y: currentPoint.y - 1 })
    }
  } else if (currentValue === 'F') {
    if (currentPoint.y < previousPoint.y) {
      loop.push({ x: currentPoint.x + 1, y: currentPoint.y })
    } else {
      loop.push({ x: currentPoint.x, y: currentPoint.y + 1 })
    }
  } else if (currentValue === '7') {
    if (currentPoint.y < previousPoint.y) {
      loop.push({ x: currentPoint.x - 1, y: currentPoint.y })
    } else {
      loop.push({ x: currentPoint.x, y: currentPoint.y + 1 })
    }
  }

  return true
}

while (step()) {
  // nothing
}

console.log((loop.length - 1) / 2)

// part 2
const vertices: Point[] = loop.filter((p) => {
  const value = grid[p.y]?.[p.x]
  return ['F', '7', 'L', 'J'].includes(value)
})
// add start if is a vertex
if (loop.at(-1)?.x !== loop.at(1)?.x || loop.at(-1)?.y !== loop.at(1)?.y) {
  vertices.unshift(loop.at(0) as Point)
}

// Area through shoelace formula
let area = 0
for (let i = 0; i < vertices.length; i++) {
  const nextIndex = (i + 1) % vertices.length
  const [currentY, currentX] = [vertices[i].y, vertices[i].x]
  const [nextY, nextX] = [vertices[nextIndex].y, vertices[nextIndex].x]
  area += currentX * nextY - currentY * nextX
}
area = Math.abs(area) / 2

// Pick's theorem
console.log(area - (loop.length - 1) / 2 + 1)
