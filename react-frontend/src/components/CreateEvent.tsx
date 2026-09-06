import { postEvent } from "../services/eventServices"
import { useState } from "react"
import { type NewCalendarEvent } from "../types/types";
import type { User } from "../types/types";

type CreateEventProps = {
    user: User
    refreshState: () => void
}

function CreateEvent( { user, refreshState}: CreateEventProps){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");

    

    async function createAndPostEvent(event: React.SubmitEvent){
        event.preventDefault()
        
            const newEvent: NewCalendarEvent = {
            creatorId: user.id,
            title: title,
            description: description,
            date: date,
            time: time,
            location: location

            }

        await postEvent(newEvent);

        refreshState()

        setTitle("")
        setDescription("")
        setDate("")
        setTime("")
        setLocation("")
    }

    return(
        <form className="form-card" onSubmit={createAndPostEvent}>
            <fieldset>
                <legend>Create Event</legend>
                <label>Title:</label>
                <input required type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                <label>Description:</label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
                <label>Date:</label>
                <input required type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
                <label>Time:</label>
                <input required type="time" value={time} onChange={(event) => setTime(event.target.value)}/>
                <label>Location</label>
                <input required type="text" value={location} onChange={(event) => setLocation(event.target.value)}/>
                <button type="submit">Create Event</button>
            </fieldset>
        </form>
    )
}

export default CreateEvent