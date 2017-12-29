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
    return {id: identity.id, name: identity.name, value: identity.id}
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

function savePreference(winner, loser) {
  let params = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ winner: winner, loser: loser })
  }
  fetch('http://localhost:3000/preferences', params)
    .then(response => response.json())
    .then(data => console.log(data))
}

export {
  fetchIdentities,
  fetchPreferences,
  savePreference
}
