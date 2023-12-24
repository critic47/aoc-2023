const input = (await Deno.readTextFile('./14/input.txt')).split('\n').map((line) => line.split(''))
const cache: Record<string, number> = {}
let result = 0

function north() {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == 'O') {
        for (let k = i - 1; k >= 0 && input[k][j] == '.'; k--) {
          input[k][j] = 'O'
          input[k + 1][j] = '.'
        }
      }
    }
  }
}

function west() {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == 'O') {
        for (let k = j - 1; k >= 0 && input[i][k] == '.'; k--) {
          input[i][k] = 'O'
          input[i][k + 1] = '.'
        }
      }
    }
  }
}

function south() {
  for (let i = input.length - 1; i >= 0; i--) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == 'O') {
        for (let k = i + 1; k < input.length && input[k][j] == '.'; k++) {
          input[k][j] = 'O'
          input[k - 1][j] = '.'
        }
      }
    }
  }
}

function east() {
  for (let i = input.length - 1; i >= 0; i--) {
    for (let j = input[i].length - 1; j >= 0; j--) {
      if (input[i][j] == 'O') {
        for (let k = j + 1; k < input[i].length && input[i][k] == '.'; k++) {
          input[i][k] = 'O'
          input[i][k - 1] = '.'
        }
      }
    }
  }
}

let loopCheck
let loopStart = 0
let i = 0
for (; i < 1000000000; i++) {
  const key = input.map((x) => x.join('')).join('')
  if (cache[key]) {
    if (key == loopCheck) break
    if (!loopCheck) {
      loopCheck = key
      loopStart = i
    }
  }
  north()
  west()
  south()
  east()
  cache[key] = i
}

for (let j = 0; j < (1000000000 - i) % (i - loopStart); j++) {
  north()
  west()
  south()
  east()
}

for (let i = 0; i < input.length; i++) {
  result += input[i].filter((x) => x == 'O').length * (input.length - i)
}

console.log(result)
