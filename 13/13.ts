const patterns = (await Deno.readTextFile('./13/input.txt')).split('\n\n')

const transpose = (m: string[]) => [...m[0]].map((_, i) => [...m].map((r) => r[i]))
const resMap = new Map<number, { index: number; orientation: 'v' | 'h' }>()

const findMirrors = (lines: string[]) => {
  let result = undefined
  let mirrorNumbers = 0
  for (let r = 0; r < lines.length - 1; r++) {
    const line = lines[r]
    const nextLine = lines[r + 1]
    if (line == nextLine) {
      const localRes = r
      let localMirrorNumbers = 1
      for (let i = r - 1; i >= 0; i--) {
        const line = lines[i]
        const nextLine = lines[r + r - i + 1]
        if (!line || !nextLine) break
        if (line === nextLine) {
          localMirrorNumbers++
          continue
        } else {
          localMirrorNumbers = 0
          break
        }
      }
      if (mirrorNumbers < localMirrorNumbers) {
        mirrorNumbers = localMirrorNumbers
        result = localRes
      }
    }
  }
  return result
}

const res = patterns.reduce((acc, pattern, i) => {
  const hLines = pattern.split('\n')
  const vLines = transpose(hLines).map((line) => line.join(''))
  const hMirror = findMirrors(hLines)
  const vMirror = findMirrors(vLines)
  if (hMirror !== undefined) {
    resMap.set(i, { index: hMirror, orientation: 'h' })
    return acc + (hMirror + 1) * 100
  }
  if (vMirror !== undefined) {
    resMap.set(i, { index: vMirror, orientation: 'v' })
    return acc + vMirror + 1
  }
  return acc
}, 0)

console.log(res)

// part 2
const stringDistance = (a: string, b: string) => {
  let distance = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) distance++
  }
  return distance
}

const findNewMirrors = (lines: string[], index: number, orientation: 'v' | 'h') => {
  let result = undefined
  for (let r = 0; r < lines.length - 1; r++) {
    const line = lines[r]
    const nextLine = lines[r + 1]
    if (line == nextLine || stringDistance(line, nextLine) === 1) {
      const old = resMap.get(index)
      if (old && old.index === r && old.orientation === orientation) {
        continue
      }
      const localRes = r
      let didSmudge = line == nextLine ? false : true
      for (let i = r - 1; i >= 0; i--) {
        const line = lines[i]
        const nextLine = lines[r + r - i + 1]
        if (!line || !nextLine) break
        if (line === nextLine) {
          continue
        } else {
          if (stringDistance(line, nextLine) === 1) {
            didSmudge = true
            continue
          }
          didSmudge = false
          break
        }
      }
      if (didSmudge) {
        result = localRes
      }
    }
  }
  return result
}

const res2 = patterns.reduce((acc, pattern, i) => {
  const hLines = pattern.split('\n')
  const vLines = transpose(hLines).map((line) => line.join(''))
  const hMirror = findNewMirrors(hLines, i, 'h')
  const vMirror = findNewMirrors(vLines, i, 'v')
  if (hMirror !== undefined) {
    return acc + (hMirror + 1) * 100
  }
  if (vMirror !== undefined) {
    return acc + vMirror + 1
  }
  return acc
}, 0)

console.log(res2)
