const input = (await Deno.readTextFile('./1/input.txt')).split('\n')

const part1 = input.reduce((acc, curr) => {
    const digits = curr.match(/\d/g)?.map(n => parseInt(n)) ?? []
    return acc + digits[0] * 10 + digits[digits.length - 1]
}, 0)

console.log(part1)  

const part2 = input.reduce((acc, line) => {
    const parsed = Array.from(line.matchAll(/(?=((\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)))/g), x => x[1])
    const digits = parsed.map(d => parseInt(d.replace('one', '1').replace('two', '2').replace('three', '3').replace('four', '4').replace('five', '5').replace('six', '6').replace('seven', '7').replace('eight', '8').replace('nine', '9')))
    return acc + digits[0] * 10 + digits[digits.length - 1]
}, 0)

console.log(part2)