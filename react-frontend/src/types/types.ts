
//User types
export type User = {
    id: number,
    name: string,
    email: string,
    password: string
}

export type NewUser = Omit<User, "id">;

export type UpdatedUser = {
    name?: string,
    email?: string,
    password?: string
}

//Event types
export type CalendarEvent = {
    id: number,
    creatorId: number,
    title: string,
    description: string,
    date: string,
    time: string,
    location: string 
}

export type NewCalendarEvent = Omit<CalendarEvent, "id">

export type UpdatedCalendarEvent = {
    title?: string,
    description?: string,
    date?: string,
    time?: string,
    location?: string 
}


//Invitation types
export type Invitation = {
    id: number,
    eventId: number,
    userId: number,
    status: "pending" | "accepted" | "declined"
}

export type NewInvitation = Omit<Invitation, "id">

export type UpdatedInvitation = Pick<Invitation, 'status'>


export type Attendee = {
    name: string
    status: "pending" | "accepted" | "declined"
}

