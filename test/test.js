const assert = require('assert')

describe('graphs.js', function() {
  const graph = require('../src/services/eigenvector')
  const linAlg = require('linear-algebra')()

  describe('#toIdentitySet()', function() {
    it('should convert an array of preferences to a set of identities', function() {
      const preferences = [
        {'sid': 0, 'tid': 1},
        {'sid': 1, 'tid': 3},
      ]
      const identitySet = graph.toIdentitySet(preferences)
      assert.deepEqual(identitySet, new Set([0, 1, 3]))
    })
  })

  describe('#toMatrix()', function() {
    it('should convert an array of preferences to a preference graph', function() {
      const preferences = [
        {'sid': 1, 'tid': 0 },
        {'sid': 0, 'tid': 3 },
      ]
      const matrix = graph.toMatrix(preferences)
      assert.deepEqual(matrix, new linAlg.Matrix([[1, 0, 1], [1, 0, 0], [0, 0, 1]]))
    })
  })

  describe('#powerMethod()', function() {
    it('should find the principal eigenvector of the matrix', function() {
      const matrix = new linAlg.Matrix([[1, 0], [1, 0]])
      const eigenvector = graph.powerMethod(matrix)
      assert.deepEqual(eigenvector, [1, 0])
    })
    it('should find the principal eigenvector of the matrix', function() {
      const matrix = new linAlg.Matrix([[1, 1], [1, 1]])
      const eigenvector = graph.powerMethod(matrix)
      assert.deepEqual(eigenvector, [.5, .5])
    })
  })

})
