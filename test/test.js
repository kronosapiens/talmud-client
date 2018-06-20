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

  describe('#fromMatrix()', function() {
    it('should convert a preference graph to a de-duplicated array of preferences', function() {
      const matrix = new linAlg.Matrix([
        [1, 0, 2],
        [1, 1, 1],
        [0, 1, 3]
      ])
      const preferences = graph.fromMatrix(matrix)
      assert.deepEqual(preferences, [{'sid': 1, 'tid': 0}, {'sid': 0, 'tid': 2}])
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

describe('identities.js', function() {
  const identities = require('../src/services/identities')

  it('should convert relationship status', function() {
    const user = {relationship: "In a Relationship", gender: "Male"}
    const role = identities.pivots["9"](user)
    assert.equal("Boyfriend", role)
  })

  it('should convert child status, with kids', function() {
    const user = {children: "Kids", gender: "Male"}
    const role = identities.pivots["6"](user)
    assert.equal("Father", role)
  })

  it('should convert child status, without kids', function() {
    const user = {children: "No Kids", gender: "Male"}
    const role = identities.pivots["6"](user)
    assert.equal("", role)
  })
})
