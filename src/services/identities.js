exports.identities = [
  { "name" : "Human", "id" : 0 },
  { "name" : "Animal", "id" : 1 },

  { "name" : "Religion", "id" : 2, "pivot" : "religion" },
  { "name" : "Ethnicity", "id" : 3, "pivot" : "ethnicity" },
  { "name" : "Profession", "id" : 4, "pivot" : "job" },

  { "name" : "Gender", "id" : 5, "pivot" : "gender" },
  { "name" : "Parent", "id" : 6, "pivot" : "gender" },
  { "name" : "Sibling", "id" : 7, "pivot" : "gender" },
  { "name" : "Child", "id" : 8, "pivot" : "gender" },
  { "name" : "Spouse", "id" : 9, "pivot" : "gender" },

  { "name" : "Progressive", "id" : 10 },
  { "name" : "Conservative", "id" : 11 },

  { "name" : "Patriot", "id" : 12 },
  { "name" : "Radical", "id" : 13 },

  { "name" : "Friend", "id" : 14 },
  { "name" : "Colleague", "id" : 15 },

  { "name" : "Spiritual", "id" : 16 },
  { "name" : "Athiest", "id" : 17 },

  { "name" : "Materialist", "id" : 18 },
  { "name" : "Idealist", "id" : 19 },
]

const malePivots = new Map([
  [5, 'Male'],
  [6, 'Father'],
  [7, 'Brother'],
  [8, 'Son'],
  [9, 'Husband'],
])

const femalePivots = new Map([
  [5, 'Female'],
  [6, 'Mother'],
  [7, 'Sister'],
  [8, 'Daughter'],
  [9, 'Wife'],
])

exports.pivots = {
  male: malePivots,
  female: femalePivots,
}
