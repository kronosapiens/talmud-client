const linAlg = require('linear-algebra')()

Array.prototype.flatMap = function(lambda) { 
    return Array.prototype.concat.apply([], this.map(lambda))
}

function norm(array) {
  return Math.sqrt(sum(array.map(x => x * x)))
}

function sum(array) {
  return array.reduce((sumSoFar, val) => sumSoFar + val, 0)
}

function sumColumns(matrix) {
  return matrix.trans().data.map(col => sum(col))
}

function toIdentitySet(preferenceArray) { // [{alpha_id, beta_id, win_bit}]
  const idArray = preferenceArray.flatMap(p => [p.sid, p.tid])
  return new Set(idArray)
}

function toIdentityMap(preferenceArray) {
  const idSet = toIdentitySet(preferenceArray)
  return new Map(
    Array.from(idSet)
      .sort((a, b) => a - b) // Javascript is the worst.
      .map((id, ix) => [id, ix]) // TrueIx -> MatrixIx
  )
}

function toMatrix(preferenceArray) { // [{alpha_id, beta_id, win_bit}]
  const idMap = toIdentityMap(preferenceArray)
  const n = idMap.size
  const matrix = linAlg.Matrix.zero(n, n)

  // Calculate the off-diagonals
  preferenceArray.forEach(p => {
    let loserIx = idMap.get(p.sid)
    let winnerIx = idMap.get(p.tid)
    matrix.data[loserIx][winnerIx] += 1
  })

  // Add the diagonals (sums of columns)
  sumColumns(matrix).map((sum, ix) => matrix.data[ix][ix] = sum)
  return matrix
}

function powerMethod(matrix, d = 1, epsilon = 0.001, nIter = 1000) {
  console.assert(matrix.rows == matrix.cols, 'Matrix must be square!')
  const n = matrix.rows

  // Normalize matrix
  matrix.data = matrix.data
    .map(row => {
      let rowSum = sum(row)
      return row.map(x => x / rowSum)
    })

  // Add damping factor
  matrix.mulEach_(d)
  matrix.plusEach_((1 - d) / n)

  // Initialize eigenvector to uniform distribution
  var eigenvector = linAlg.Vector.zero(n)
    .plusEach(1.0 / n)

  // Power method
  var prev = eigenvector
  for (var i = 0; i < nIter; i++) {
    eigenvector = prev.dot(matrix)
    if (norm(eigenvector.minus(prev).data[0]) < epsilon) break
    prev = eigenvector
  }

  console.log(`Eigenvector convergence after ${i} iterations`)
  return eigenvector.data[0]
}

exports.toIdentitySet = toIdentitySet
exports.toIdentityMap = toIdentityMap
exports.toMatrix = toMatrix
exports.powerMethod = powerMethod
