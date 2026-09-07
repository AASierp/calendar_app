import { getEvents } from "../services/eventServices"
import { getInvitations } from "../services/invitationServices"
import type { CalendarEvent, User } from "../types/types"
import { useState, useEffect } from "react"

type EventListProps = {
    user: User
    refresh: number
    liftEvent: (event: CalendarEvent) => void
}

function EventList( { user, refresh, liftEvent }: EventListProps){
    const [userEvents, setUserEvents] = useState<CalendarEvent[]>([])
    const [dateRangeStart, setDateRangeStart] = useState("");
    const [dateRangeEnd, setDateRangeEnd] = useState("");
    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[] | null>(null)
    const [message, setMessage] = useState("");

    useEffect(() => {

            async function parseEvents(): Promise<void>{
            const eventList =  await getEvents();
            const inviteList = await getInvitations();
            const userAcceptedInvites = inviteList.filter((invite) => invite.userId === user.id &&
            invite.status === "accepted");
            const userEventsAttending = eventList.filter(event => userAcceptedInvites.some(invite => invite.eventId === event.id))
            const filteredUserEvents = eventList.filter((event) => event.creatorId === user.id);
            const allUserEvents = filteredUserEvents.concat(userEventsAttending)
            setUserEvents(allUserEvents);
        }

        parseEvents();

    }, [refresh, user.id])

    function filterEvents(e: React.SubmitEvent){
        e.preventDefault();

        setMessage("");
        if(dateRangeStart > dateRangeEnd){
            setMessage("Your starting date cannot be after your ending date.");
            return
        }
        const filtered = userEvents.filter((event) => event.date >= dateRangeStart && event.date <= dateRangeEnd)
        setFilteredEvents(filtered)
    }

   

    return(
       <>
        <form onSubmit={filterEvents}>
            <fieldset>
                <legend>Filter Events by Date</legend>
                <label>Start Date: </label>
                <input required type="date" value={dateRangeStart} onChange={(e) => {setDateRangeStart(e.target.value)}}/>
                <label>End Date: </label>
                <input required type="date" value={dateRangeEnd} onChange={(e) => {setDateRangeEnd(e.target.value)}}/>
                <button type="submit">Filter</button>
                <button type="button" onClick={() => {setFilteredEvents(null); setMessage(""); setDateRangeStart(""); setDateRangeEnd("")}}>Clear</button>
                {message && <p>{message}</p>}
            </fieldset>
        </form>
        <h2>Your Events Events: </h2>
        {userEvents.length === 0 && <p>You have no current events</p>}
        {!filteredEvents ?
        userEvents.map((event) =>
                <div className="event-card" key={event.id}>
                    <p>{event.title}</p>
                    <p>{event.description}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    <button onClick={() => {liftEvent(event)}}>Event Details</button>
                </div> 
            ) 
            :
            filteredEvents.map((event) =>
                <div className="event-card" key={event.id}>
                    <p>{event.title}</p>
                    <p>{event.description}</p>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Location: {event.location}</p>
                    <button onClick={() => {liftEvent(event)}}>Event Details</button>
                </div> 
            )
        }
       </>
    )

}

export default EventList