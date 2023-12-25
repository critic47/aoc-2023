const input = (await Deno.readTextFile('./16/input.txt')).split('\n').map((line) => line.split(''))

type Coord = { x: number; y: number }
type Beam = { id: string; position: Coord; direction: 'up' | 'down' | 'left' | 'right' }

const beams: Map<string, Beam> = new Map()
const energised: Set<string> = new Set()
const positionCache: Set<string> = new Set()
beams.set('0', { id: '0', position: { x: 0, y: 0 }, direction: 'right' })
energised.add('0,0')

const move = (beam: Beam) => {
  const { position, direction } = beam
  const { x, y } = position
  const newPosition = {
    x: x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0),
    y: y + (direction === 'up' ? -1 : direction === 'down' ? 1 : 0),
  }
  beam.position = newPosition
  if (newPosition.x < 0 || newPosition.y < 0 || newPosition.x >= input[0].length || newPosition.y >= input.length) {
    return
  }
  const newId = `${newPosition.x},${newPosition.y}`
  energised.add(newId)
}

let isMoving = true
while (isMoving) {
  isMoving = false
  beams.forEach((beam) => {
    const { position, direction } = beam
    const { x, y } = position
    const key = `${x},${y},${direction}`
    if (positionCache.has(key)) {
      return
    }
    isMoving = true
    positionCache.add(key)
    const char = input[y] ? input[y][x] : null
    if (!char) {
      return
    } else if (char === '.') {
      move(beam)
      return
    } else if (char === '/') {
      switch (direction) {
        case 'up':
          beam.direction = 'right'
          break
        case 'down':
          beam.direction = 'left'
          break
        case 'left':
          beam.direction = 'down'
          break
        case 'right':
          beam.direction = 'up'
          break
      }
      move(beam)
      return
    } else if (char === '\\') {
      switch (direction) {
        case 'up':
          beam.direction = 'left'
          break
        case 'down':
          beam.direction = 'right'
          break
        case 'left':
          beam.direction = 'up'
          break
        case 'right':
          beam.direction = 'down'
          break
      }
      move(beam)
      return
    } else if (char === '|') {
      switch (direction) {
        case 'left':
        case 'right': {
          beam.direction = 'up'
          const newBeam = { id: beams.size.toString(), position: { x, y }, direction: 'down' } as Beam
          beams.set(newBeam.id, newBeam)
          move(newBeam)
          break
        }
      }
      move(beam)
      return
    } else if (char === '-') {
      switch (direction) {
        case 'up':
        case 'down': {
          beam.direction = 'left'
          const newBeam = { id: beams.size.toString(), position: { x, y }, direction: 'right' } as Beam
          beams.set(newBeam.id, newBeam)
          move(newBeam)
          break
        }
      }
      move(beam)
      return
    } else {
      console.log('char not found')
    }
  })
}

console.log(energised.size)
