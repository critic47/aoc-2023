const input = (await Deno.readTextFile('./7/input.txt')).split('\n')

const count = (str: string, char: string) => str.split(char).length - 1

const valueMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
}
const handMap = {
  '5_1': 7, // five of a kind
  '4_2': 6, // four of a kind
  '3_2': 5, // full house
  '3_3': 4, // three of a kind
  '2_3': 3, // two pairs
  '2_4': 2, // one pair
  '1_5': 1, // high card
}

type HandValues = Record<
  string,
  {
    count: number
    value: number
  }
>

type Hand = {
  string: string
  hand: HandValues
  handPower: number
  bid: number
}

const hands: Hand[] = input.map((line) => {
  const [cards, bid] = line.split(' ')
  const hand: HandValues = {}
  for (const card of [...cards]) {
    hand[card] = {
      count: count(cards, card),
      // @ts-ignore: it works
      value: valueMap[card],
    }
  }
  return {
    string: cards,
    hand: hand,
    // @ts-ignore: trust me, it works too
    handPower: handMap[`${Math.max(...Object.values(hand).map((h) => h.count))}_${Object.keys(hand).length}`],
    bid: parseInt(bid),
  }
})

const compareHands = (a: Hand, b: Hand) => {
  try {
    if (a.handPower > b.handPower) {
      return 1
    }
    if (a.handPower < b.handPower) {
      return -1
    }
    const [aCards, bCards] = [[...a.string], [...b.string]]
    for (let i = 0; i < aCards.length; i++) {
      const [aValue, bValue] = [a.hand[aCards[i]].value, b.hand[bCards[i]].value]
      if (aValue > bValue) {
        return 1
      }
      if (aValue < bValue) {
        return -1
      }
    }
    return 0
  } catch (e) {
    console.log(a, b)
    throw e
  }
}

const result = hands.sort(compareHands).reduce((acc, cur, i) => {
  return acc + cur.bid * (i + 1)
}, 0)
console.log(result)
