export enum Gender {
  Male,
  Female,
  Other
}

export type User = {
  name: string
  address?: string
  gender: Gender
}

export type Comment = {
  _id: string,
  rating: number,
  content: string,
  author: Member,
}

export type Watch = {
  _id: string
  watchName: string
  image: string,
  price: number,
  Automatic: boolean,
  watchDescription: string,
  brand: Brand,
  comments: Comment[],
}

export type Brand = {
  _id: string,
  brandName: string,
}

export type Member = {
  _id: string,
  membername: string,
  name: string,
  isAdmin: boolean,
  yob: number,
}


export const Watches: Watch[] = [
  {
    _id: "728ed52f",
    watchName: "Rolex Submariner",
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 6900,
    Automatic: true,
    watchDescription: "The Rolex Submariner is a watch collection that is known for its durability and water resistance. It is a great watch for diving and other water sports.",
    brand: {
      _id: "728ed52f",
      brandName: "Rolex",
    },
    comments: [],
  },
  {
    _id: "728ed52f",
    watchName: "Casio Submariner",
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 6900,
    Automatic: false,
    watchDescription: "The Rolex Submariner is a watch collection that is known for its durability and water resistance. It is a great watch for diving and other water sports.",
    brand: {
      _id: "728ed52f",
      brandName: "Casio",
    },
    comments: [],
  },
  // ...
]

