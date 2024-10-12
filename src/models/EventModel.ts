export interface EventModel {
    authorId: string
    date: number
    description: string
    endAt: number
    imgUrl: string
    location: Location
    startAt: number
    title: string
    users: string[]
  }
  
  export interface Location {
    address: string
    title: string
  }
  