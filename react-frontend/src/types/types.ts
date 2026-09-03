export type User = {
    id: number,
    name: string,
    email: string,
    password: string
}

export type CalendarEvent = {
    id: number,
    creatorId: number,
    title: string,
    description: string,
    date: string,
    time: string,
    location: string 
}

export type Invitation = {
    id: number,
    eventId: number,
    userId: number,
    status: "pending" | "accepted" | "declined"
}