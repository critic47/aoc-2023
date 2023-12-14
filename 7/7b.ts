const input = (await Deno.readTextFile('./7/input.txt')).split('\n')

const count = (str: string, char: string) => str.split(char).length - 1

const valueMap = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
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
  let jokers = 0
  for (const card of [...cards]) {
    if (card === 'J') {
      jokers = count(cards, card)
    } else {
      hand[card] = {
        count: count(cards, card),
        // @ts-ignore: it works
        value: valueMap[card],
      }
    }
  }
  const maxCard = Object.keys(hand)
    .filter((k) => hand[k].count === Math.max(...Object.values(hand).map((h) => h.count)))
    .sort((a, b) => hand[b].value - hand[a].value)[0]
  if (!maxCard) {
    hand['J'] = {
      count: count(cards, 'J'),
      // @ts-ignore: it works
      value: valueMap['J'],
    }
  } else {
    hand[maxCard].count += jokers
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
  if (a.handPower > b.handPower) {
    return 1
  }
  if (a.handPower < b.handPower) {
    return -1
  }
  const [aCards, bCards] = [[...a.string], [...b.string]]
  for (let i = 0; i < aCards.length; i++) {
    // @ts-ignore: this works too
    const [aValue, bValue] = [valueMap[aCards[i]], valueMap[bCards[i]]]
    if (aValue > bValue) {
      return 1
    }
    if (aValue < bValue) {
      return -1
    }
  }
  return 0
}

const result = hands.sort(compareHands).reduce((acc, cur, i) => {
  return acc + cur.bid * (i + 1)
}, 0)
console.log(result)
