export const users = [
  {
    name: {
      first: "Artsiom",
      last: "Finenka",
    },
    age: 38,
    // will be converted to lowercase (according to the userSchema)
    email: "AFINENKA@mail.com",
  },
  {
    name: {
      first: "Anfisa",
      last: "Finenka",
    },
    age: 18,
    email: "anfisa@mail.com",
  },
  {
    name: {
      first: "Katrin",
      last: "Finenka",
    },
    age: 34,
    email: "katrin@mail.com",
  },
  {
    name: {
      first: "Tihon",
      last: "Cat",
    },
    age: 13,
    email: "tihon@mail.com",
  },
  // Will not pass validation:
  {
    name: {
      last: "Finenka",
    },
  },
  {
    name: {
      first: "Alex",
      last: "Finenka",
    },
    age: 0,
    email: "alex@mail.com",
  },
  {
    name: {
      first: "Alex",
      last: "Finenka",
    },
    age: 37,
    email: "alex@mail",
  },
];

