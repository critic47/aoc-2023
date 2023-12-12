const input = (await Deno.readTextFile('./3/input.txt')).split('\n')

// part 1
let sum = 0
input.forEach((line, index) => {
    const numbers = Array.from(line.matchAll(/\d+/g))
    numbers?.forEach(number => {
        const [n, startIndex, finishIndex] = [parseInt(number[0]), number.index ?? 0, (number.index ?? 0) + number[0].length - 1]
        let hasSymbol = false
        for (let k = Math.max(index-1, 0); k <= Math.min(index+1, input.length - 1); k++) {
            for (let l = Math.max(startIndex-1, 0); l <= Math.min(finishIndex+1, line.length - 1); l++) {
                if (isNaN(parseInt(input[k][l])) && input[k][l] !== '.') {
                    hasSymbol = true
                }   
            }
        }
        if (hasSymbol) {
            sum += n
        }
    }) 
}) 
console.log(sum)
  
// part 2
let gearSum = 0
input.forEach((line, index) => {
    const matches = Array.from(line.matchAll(/\*/g))
    matches?.forEach(match => {
        const adjacent: number[] = []
        for (let i = Math.max(index - 1, 0); i <= Math.min(index + 1, input.length - 1); i++) {
            const numbers = Array.from(input[i].matchAll(/\d+/g))
            numbers?.forEach(number => {
                if (match.index !== undefined && number.index !== undefined) {
                    const finishIndex = number.index + number[0].length - 1
                    if ((number.index >= match.index - 1 && number.index <= match.index + 1) || (finishIndex >= match.index - 1 && finishIndex <= match.index + 1)) {
                        adjacent.push(parseInt(number[0]))
                    }
                }
            })
        }
        if (adjacent.length === 2) {
            gearSum += adjacent[0] * adjacent[1]
        }
    }) 
}) 
console.log(gearSum)