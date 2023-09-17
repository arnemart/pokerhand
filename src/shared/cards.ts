import { shuffle, frequencies, zip } from "./utils"

export const RANKS = [
  "High card",
  "One pair",
  "Two pair",
  "Three of a kind",
  "Straight",
  "Flush",
  "Full house",
  "Four of a kind",
  "Straight flush"
] as const
export const SUITS = ["h", "r", "k", "s"]
export const NUMS = ["2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k", "a"]

export const deck = () => SUITS.flatMap((s) => NUMS.map((n) => `${s}${n}`))
export const shuffledDeck = () => shuffle(deck())

export const compareCards = (c1: string, c2: string): number =>
  NUMS.indexOf(c1.substring(1, 2)) - NUMS.indexOf(c2.substring(1, 2))

export type Hand = [string, string, string, string, string]

const checkSeq = (arr: number[]): boolean =>
  zip(arr.slice(1), arr).every(([i1, i2]) => i1 - i2 == 1)

const sequential = (nums: string[]): { isSequential: boolean; lowAce: boolean } => {
  const acesHigh = nums.map((n) => NUMS.indexOf(n))
  if (checkSeq(acesHigh)) {
    return { isSequential: true, lowAce: false }
  } else if (nums[nums.length - 1] == "a") {
    const acesLow = [-1, ...acesHigh.slice(0, -1)]
    return { isSequential: checkSeq(acesLow), lowAce: true }
  }
  return { isSequential: false, lowAce: false }
}

type Rank = (typeof RANKS)[number]

export type Classification = {
  hand: Hand
  rank: Rank
  order: string[]
}

export const orderHands = (hands: Classification[]): Classification[] =>
  hands.sort((h1, h2) => {
    const h1r = RANKS.indexOf(h1.rank)
    const h2r = RANKS.indexOf(h2.rank)
    if (h1r != h2r) {
      return h2r - h1r
    }

    for (let i = 0; i < h1.order.length; i++) {
      const h1o = NUMS.indexOf(h1.order[i])
      const h2o = NUMS.indexOf(h2.order[i])
      if (h1o != h2o) {
        return h2o - h1o
      }
    }

    return 0
  })

export const classify = (hand: Hand): Classification => {
  hand = hand.sort(compareCards)
  const splitHand = hand.map((c) => c.split(""))
  const uniqueSuits = new Set(splitHand.map((c) => c[0])).size
  const nums = splitHand.map((c) => c[1])
  const { isSequential, lowAce } = sequential(nums)
  const numCounts = frequencies(nums)
  const uniqueNums = numCounts.size
  const largestGroup = Math.max(...numCounts.values())
  const orderedNumGroups = [...numCounts.entries()]
    .sort(
      ([a, aCount], [b, bCount]) =>
        bCount * 100 + NUMS.indexOf(b) - (aCount * 100 + NUMS.indexOf(a))
    )
    .map(([num]) => num)

  if (uniqueSuits == 1 && isSequential) {
    return {
      hand,
      rank: "Straight flush",
      order: lowAce ? nums.slice(-2, -1) : nums.slice(-1)
    }
  }

  if (uniqueNums == 2 && largestGroup == 4) {
    return { hand, rank: "Four of a kind", order: orderedNumGroups }
  }

  if (uniqueNums == 2 && largestGroup == 3) {
    return { hand, rank: "Full house", order: orderedNumGroups }
  }

  if (uniqueSuits == 1) {
    return { hand, rank: "Flush", order: nums.reverse() }
  }

  if (isSequential) {
    return {
      hand,
      rank: "Straight",
      order: lowAce ? nums.slice(-2, -1) : nums.slice(-1)
    }
  }

  if (uniqueNums == 3 && largestGroup == 3) {
    return { hand, rank: "Three of a kind", order: orderedNumGroups }
  }

  if (uniqueNums == 3 && largestGroup == 2) {
    return { hand, rank: "Two pair", order: orderedNumGroups }
  }

  if (uniqueNums == 4 && largestGroup == 2) {
    return { hand, rank: "One pair", order: orderedNumGroups }
  }

  return { hand, rank: "High card", order: nums.reverse() }
}
