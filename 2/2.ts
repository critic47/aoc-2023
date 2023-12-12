const input = (await Deno.readTextFile('./2/input.txt')).split('\n')

const limits: Record<string, number> = {
    red: 12, 
    green: 13,
    blue: 14
}

// part 1
const gameSum = input.reduce((acc, line) => {
    const [id, rest] = line.split(':')
    const gameID = (id.match(/(\d+)/) ?? [])[0] ?? '0'
    const validGame = rest.split(';').map(g => g.trim()).reduce((gameAcc, gameCurrent) => {
        const validRound = gameCurrent.split(',').reduce((roundAcc, roundCurrent) => {
            const [_, number, colour] = roundCurrent.match(/(\d+) (\w+)/) ?? []
            return roundAcc && parseInt(number) <= limits[colour]
        }, true)
        return gameAcc && validRound
    }, true)
    return validGame ? acc + parseInt(gameID) : acc
}, 0)

console.log(gameSum)

// part 2
const games = input.reduce((total, line) => {
    const [_, rest] = line.split(':')
    const game = rest.split(';').map(g => g.trim()).reduce((gAcc, g) => {
        const round = g.split(',').reduce((acc, r) => {
            const [_, number, colour] = r.match(/(\d+) (\w+)/) ?? []
            acc[colour] = parseInt(number)
            return acc
        }, {} as Record<string, number>)
        gAcc['red'] = Math.max(gAcc['red'] ?? 0, round['red'] ?? 0)
        gAcc['green'] = Math.max(gAcc['green'] ?? 0, round['green'] ?? 0)
        gAcc['blue'] = Math.max(gAcc['blue'] ?? 0, round['blue'] ?? 0)
        return gAcc
    }, {} as Record<string, number>)
    return total + (game['red'] * game['green'] * game['blue'])
}, 0) 

console.log(games)