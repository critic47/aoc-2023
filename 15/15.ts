const input = (await Deno.readTextFile('./15/input.txt')).replace('\n', '').split(',')

const hash = (str: string) => {
  return [...str].reduce((acc, char) => {
    return ((acc + char.charCodeAt(0)) * 17) % 256
  }, 0)
}

const res = input.reduce((acc, step) => {
  const value = hash(step)
  return acc + value
}, 0)

console.log(res)

// part 2
const boxes: { label: string; focalLength: number }[][] = Array(256)
  .fill([])
  .map(() => [])

input.forEach((step) => {
  const [_, label, operation, focalLength] = step.match(/(\w+)([\=\-])(\d+)?/) ?? []
  const box = hash(label)
  const index = boxes[box].findIndex((box) => box.label === label)
  if (operation === '=') {
    if (index === -1) {
      boxes[box].push({ label, focalLength: parseInt(focalLength) })
    } else {
      boxes[box][index].focalLength = parseInt(focalLength)
    }
  } else {
    if (index > -1) {
      boxes[box].splice(index, 1)
    }
  }
})

const result = boxes.reduce((acc, box, boxIndex) => {
  return (
    acc +
    box.reduce((acc, { focalLength }, index) => {
      return acc + (boxIndex + 1) * (index + 1) * focalLength
    }, 0)
  )
}, 0)

console.log(result)
