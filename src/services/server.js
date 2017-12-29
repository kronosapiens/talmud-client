function fetchIdentities (that) {
  fetch('http://localhost:3000/identities')
  .then(response => response.json())
  .then(identities => {
    that.identities = unpackIdentities(identities)
  })
}

function fetchPreferences (that) {
  fetch('http://localhost:3000/preferences')
  .then(response => response.json())
  .then(preferences => {
    that.nodes = unpackNodes(preferences)
    that.links = unpackLinks(preferences)
  })
}

function unpackIdentities(identities) {
  return identities.map(identity => {
    return {name: identity.name, weight: 10 - identity.id}
  })
}

function unpackLinks(preferences) {
  return preferences.map(p =>
    p.winner ? { sid: p.a_id, tid: p.b_id } : { sid: p.b_id, tid: p.a_id }
    )
}

function unpackNodes(preferences) {
  const nodeSet = new Set()
  preferences.forEach(p => { nodeSet.add(p.a_id); nodeSet.add(p.b_id) })
  return Array.from(nodeSet).map(x => { return { id: x } })
}

export { fetchIdentities, fetchPreferences }
