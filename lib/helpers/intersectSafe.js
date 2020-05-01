/**
 * Original code from http://stackoverflow.com/a/1885660/394013
 */
export const intersectSafe = (a, b) => {
  let ai = 0,
    bi = 0
  let result = []

  while (ai < a.length && bi < b.length) {
    if (a[ai] < b[bi]) {
      ai++
    } else if (a[ai] > b[bi]) {
      bi++
    } /* they're equal */ else {
      result.push(a[ai])
      ai++
      bi++
    }
  }

  return result
}
