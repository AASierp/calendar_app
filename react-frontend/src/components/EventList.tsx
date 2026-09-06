import { getEvents } from "../services/eventServices"
import type { CalendarEvent, User } from "../types/types"
import { useState, useEffect } from "react"

type EventListProps = {
    user: User
    refresh: number
    liftEvent: (event: CalendarEvent) => void
}

function EventList( { user, refresh, liftEvent }: EventListProps){
    const [userEvents, setUserEvents] = useState<CalendarEvent[]>([])

    useEffect(() => {

            async function parseEvents(): Promise<void>{
            const eventList =  await getEvents();
            const filteredEvents = eventList.filter((event) => event.creatorId === user.id);
            setUserEvents(filteredEvents);
        }

        parseEvents();

    }, [refresh, user.id])

   

    return(
       <>
        {userEvents.length === 0 && <p>You have no current events</p>}
        {userEvents.map((event) =>
            <div className="event-card" key={event.id}>
                <p>{event.title}</p>
                <p>{event.description}</p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
                <button onClick={() => {liftEvent(event)}}>Event Details</button>
            </div> 
        )}
       </>
    )

}

export default EventList