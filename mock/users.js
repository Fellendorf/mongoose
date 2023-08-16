export const users = [
  {
    name: {
      first: "Artsiom",
      last: "Finenka",
    },
    age: 38,
    email: "AFINENKA@mail.com", // will be converted to lowercase (according to the userSchema)
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
    age: 17,
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

