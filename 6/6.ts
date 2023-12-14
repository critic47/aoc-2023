const [timeArray, distanceArray] = (await Deno.readTextFile('./6/input.txt'))
  .split('\n')
  .map((line) => line.split(':')[1].trim().match(/(\d+)/g))

if (!timeArray || !distanceArray) {
  Deno.exit(1)
}

// part 1
const results = timeArray.map((_time, index) => {
  const time = parseInt(_time)
  const distance = parseInt(distanceArray[index])
  let res = 0
  for (let speed = 0; speed <= time; speed++) {
    const distanceTravelled = (time - speed) * speed
    if (distanceTravelled > distance) {
      res++
    }
  }
  return res
})
console.log(results.reduce((acc, cur) => acc * cur, 1))

// part 2
const [time, distance] = [timeArray.join(''), distanceArray.join('')].map((n) => parseInt(n))
let res = 0
for (let speed = 0; speed <= time; speed++) {
  const distanceTravelled = (time - speed) * speed
  if (distanceTravelled > distance) {
    res++
  }
}
console.log(res)
