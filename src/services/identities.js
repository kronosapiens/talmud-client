exports.identities = [ // TODO: revert id to int once graph is patched.
  { "id" : "0", "name" : "Human" },
  { "id" : "1", "name" : "Animal" },

  { "id" : "2", "name" : "Religion", "pivot" : true },
  { "id" : "3", "name" : "Ethnicity", "pivot" : true },
  { "id" : "4", "name" : "Profession", "pivot" : true },

  { "id" : "5", "name" : "Gender", "pivot" : true },
  { "id" : "6", "name" : "Parent", "pivot" : true },
  { "id" : "7", "name" : "Sibling", "pivot" : true },
  { "id" : "8", "name" : "Child", "pivot" : true },
  { "id" : "9", "name" : "Partner", "pivot" : true },

  { "id" : "10", "name" : "Liberal" },
  { "id" : "11", "name" : "Conservative" },

  // { "id" : "12", "name" : "Patriot" },
  // { "id" : "13", "name" : "Radical" },

  { "id" : "14", "name" : "Friend" },
  { "id" : "15", "name" : "Colleague" },
]

exports.pivots = {
  "2": function(user) {
    return user.religion
  },
  "3": function(user) {
    return user.ethnicity
  },
  "4": function(user) {
    return user.job
  },
  "5": function(user) {
    return user.gender
  },
  "6": function(user) {
    if (user.children == "No Kids") return ""
    else if (user.gender === "Male") return "Father"
    else if (user.gender === "Female") return "Mother"
    else return "Parent"
  },
  "7": function(user) {
    if (user.siblings == "No Siblings") return ""
    else if (user.gender === "Male") return "Brother"
    else if (user.gender === "Female") return "Sister"
    else return "Sibling"
  },
  "8": function(user) {
    if (user.gender === "Male") return "Son"
    else if (user.gender === "Female") return "Daughter"
    else return "Child"
  },
  "9": function(user) {
    if (user.relationship === "Married" ) {
      if (user.gender === "Male") return "Husband"
      else if (user.gender === "Female") return "Wife"
      else return "Partner"
    } else if (user.relationship === "In a Relationship") {
      if (user.gender === "Male") return "Boyfriend"
      else if (user.gender === "Female") return "Girlfriend"
      else return "Partner"
    } else return ""
  }
}