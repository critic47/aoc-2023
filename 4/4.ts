const input = (await Deno.readTextFile('./4/input.txt')).split('\n')

// part 1
const part1 = input.reduce((acc, line) => {
    const [_card, rest] = line.split(':')
    const [left, right] = rest.split('|')
    const winningNumbers = left.match(/(\d+)+/g)?.map(n => parseInt(n)) ?? []
    const myNumbers = (right.match(/(\d+)+/g)?.map(n => parseInt(n)) ?? []).filter(n => winningNumbers.includes(n))
    return acc + (myNumbers.length > 0 ? Math.pow(2, myNumbers.length - 1) : 0)
}, 0) 
console.log(part1) 

// part 2
const cards: Record<string, number> = {}
input.forEach((_, i) => {cards[i + 1] = 1})
input.forEach(line => {
    const [card, rest] = line.split(':')
    const cardID = (card.match(/(\d+)/) ?? [])[0] ?? '0'
    const [left, right] = rest.split('|')
    const winningNumbers = left.match(/(\d+)+/g)?.map(n => parseInt(n)) ?? []
    const myNumbers = (right.match(/(\d+)+/g)?.map(n => parseInt(n)) ?? []).filter(n => winningNumbers.includes(n))
    for (let i = 0; i < cards[cardID] ?? 0; i++) {
        for (let j = parseInt(cardID) + 1; j <= parseInt(cardID) + myNumbers.length; j++) {
            cards[j] = cards[j] + 1
        }
    }
})
console.log(Object.values(cards).reduce((acc, current) => acc + current, 0))