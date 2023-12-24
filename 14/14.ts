const input = (await Deno.readTextFile('./14/input.txt')).split('\n').map((line) => line.split(''))

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

const result = input.reduce((acc, line, index) => {
  return acc + line.filter((char) => char === 'O').length * Math.abs(index - input.length)
}, 0)

console.log(result)
