import type { CalendarEvent, NewCalendarEvent, UpdatedCalendarEvent } from "../types/types";

const URL = "http://localhost:3001/events"

export async function getEvents(): Promise<CalendarEvent[]>{
    try{
        const response = await fetch(URL);
        if(!response.ok){
            throw new Error("Could not fetch Events");
        }
        const data = await response.json();
        return data
    }catch(error){
        console.error(error)
    }
    return [];
}

export async function postEvent(event: NewCalendarEvent): Promise<void>{
    try{
        const response = await fetch(URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event)
        })
        if(!response.ok){
            throw new Error("Could not post event.");
        }
    }catch(error){
        console.error(error);
    }
}

export async function updateEvent(eventId: number, updatedCalendarEvent: UpdatedCalendarEvent): Promise<void>{

    try{
        const response = await fetch(`${URL}/${eventId}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedCalendarEvent)
        })
        if(!response.ok){
            throw new Error("Could not update event.");
        }

    }catch(error){
        console.error(error);
    }
}

export async function deleteEvent(eventId: number): Promise<void>{

    try{
        const response = await fetch(`${URL}/${eventId}`, {
            method: "DELETE",
        })
        if(!response.ok){
            throw new Error("Event could not be deleted");
        }
    }catch(error){
        console.error(error);
    }
}