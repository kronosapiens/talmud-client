exports.identities = [ // TODO: revert id to int once graph is patched.
  { "id" : "0", "name" : "Human" },
  { "id" : "1", "name" : "Animal" },

  { "id" : "2", "name" : "Religion", "pivot" : "religion" },
  { "id" : "3", "name" : "Ethnicity", "pivot" : "ethnicity" },
  { "id" : "4", "name" : "Profession", "pivot" : "job" },

  { "id" : "5", "name" : "Gender", "pivot" : "gender" },
  { "id" : "6", "name" : "Parent", "pivot" : "gender" },
  { "id" : "7", "name" : "Sibling", "pivot" : "gender" },
  { "id" : "8", "name" : "Child", "pivot" : "gender" },
  { "id" : "9", "name" : "Spouse", "pivot" : "gender" },

  { "id" : "10", "name" : "Progressive" },
  { "id" : "11", "name" : "Conservative" },

  { "id" : "12", "name" : "Patriot" },
  { "id" : "13", "name" : "Radical" },

  { "id" : "14", "name" : "Friend" },
  { "id" : "15", "name" : "Colleague" },

  // { "id" : "18", "name" : "Materialist" },
  // { "id" : "19", "name" : "Idealist" },
]

const malePivots = new Map([
  ["5", 'Male'],
  ["6", 'Father'],
  ["7", 'Brother'],
  ["8", 'Son'],
  ["9", 'Husband'],
])

const femalePivots = new Map([
  ["5", 'Female'],
  ["6", 'Mother'],
  ["7", 'Sister'],
  ["8", 'Daughter'],
  ["9", 'Wife'],
])

exports.pivots = {
  male: malePivots,
  female: femalePivots,
}
