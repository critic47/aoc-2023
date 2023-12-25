const input = (await Deno.readTextFile('./18/input.txt')).split('\n')

type Point = {
  x: number
  y: number
}

const calcArea = (vertices: Point[], perimeter: number) => {
  let area = 0
  for (let i = 0; i < vertices.length; i++) {
    const nextIndex = (i + 1) % vertices.length
    const [currentY, currentX] = [vertices[i].y, vertices[i].x]
    const [nextY, nextX] = [vertices[nextIndex].y, vertices[nextIndex].x]
    area += currentX * nextY - currentY * nextX
  }
  return perimeter + (Math.abs(area) / 2 - perimeter / 2 + 1)
}

const part1 = () => {
  const vertices: Point[] = [{ x: 0, y: 0 }]
  let perimeter = 0
  input.forEach((line, index) => {
    const [direction, meters, colour] = line.split(' ')
    switch (direction) {
      case 'U':
        vertices.push({ x: vertices[index].x, y: vertices[index].y - parseInt(meters) })
        break
      case 'D':
        vertices.push({ x: vertices[index].x, y: vertices[index].y + parseInt(meters) })
        break
      case 'L':
        vertices.push({ x: vertices[index].x - parseInt(meters), y: vertices[index].y })
        break
      case 'R':
        vertices.push({ x: vertices[index].x + parseInt(meters), y: vertices[index].y })
        break
    }
    perimeter += parseInt(meters)
  })

  return calcArea(vertices, perimeter)
}

const part2 = () => {
  const vertices: Point[] = [{ x: 0, y: 0 }]
  let perimeter = 0
  input.forEach((line, index) => {
    const [_d, _m, _c] = line.split(' ')
    const [_, hexMeters, hexDirection] = _c.match(/(\w{5})(\w{1})/) ?? []
    const meters = parseInt(hexMeters ?? '', 16)
    switch (hexDirection) {
      case '0':
        vertices.push({ x: vertices[index].x + meters, y: vertices[index].y })
        break
      case '1':
        vertices.push({ x: vertices[index].x, y: vertices[index].y + meters })
        break
      case '2':
        vertices.push({ x: vertices[index].x - meters, y: vertices[index].y })
        break
      case '3':
        vertices.push({ x: vertices[index].x, y: vertices[index].y - meters })
        break
    }
    perimeter += meters
  })

  return calcArea(vertices, perimeter)
}

console.log('Part 1:', part1())
console.log('Part 2:', part2())
