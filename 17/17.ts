const input = (await Deno.readTextFile('./17/input.txt'))
  .split('\n')
  .map((line) => line.split('').map((n) => parseInt(n)))

interface Position {
  x: number
  y: number
  xDir: number
  yDir: number
  consecutive: number
  heat: number
}

const end = { x: input[0].length - 1, y: input.length - 1 }

console.log(end)

const findPaths = (queue: Position[], minSteps: number, maxSteps: number) => {
  const paths: number[] = []
  const visitedPoints: Set<string> = new Set()

  const move = (current: Position, xDir: number, yDir: number): void => {
    const newX = current.x + xDir
    const newY = current.y + yDir
    const sameDirection = xDir === current.xDir && yDir === current.yDir

    if (newY < 0 || newY >= input.length || newX < 0 || newX >= input[0].length) return
    if (xDir === -current.xDir && yDir === -current.yDir) return
    if (current.consecutive === maxSteps && sameDirection) return
    if (current.consecutive < minSteps && !sameDirection && !(current.x === 0 && current.y === 0)) return
    queue.push({
      x: newX,
      y: newY,
      xDir,
      yDir,
      consecutive: sameDirection ? current.consecutive + 1 : 1,
      heat: current.heat + input[newY][newX],
    })
    queue.sort((a, b) => a.heat - b.heat)
  }

  while (queue.length > 0) {
    const current = queue.shift()!
    const { x, y, xDir, yDir, consecutive, heat } = current
    if (x === end.x && y === end.y && current.consecutive >= minSteps) {
      return heat
    }
    const key = `${x},${y},${xDir},${yDir},${consecutive}`
    if (visitedPoints.has(key)) {
      continue
    }
    visitedPoints.add(key)
    move(current, 1, 0)
    move(current, -1, 0)
    move(current, 0, 1)
    move(current, 0, -1)
  }
  return Math.min(...paths)
}

console.log('Part 1', findPaths([{ x: 0, y: 0, xDir: 0, yDir: 0, consecutive: 0, heat: 0 }], 0, 3))
console.log('Part 2', findPaths([{ x: 0, y: 0, xDir: 0, yDir: 0, consecutive: 0, heat: 0 }], 4, 10))
