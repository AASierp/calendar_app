import { useState, useEffect} from "react"
import type { CalendarEvent, User } from "../types/types"
import { type UpdatedCalendarEvent } from "../types/types";
import { updateEvent, deleteEvent } from "../services/eventServices";
import { getUsers } from "../services/userServices";
import { type NewInvitation } from "../types/types";
import { deleteInvitation, getInvitations, postInvitation } from "../services/invitationServices";
import { type Attendee } from "../types/types";


type EventDetailsProps = {
    currentEvent: CalendarEvent
    setCurrentEvent: (event: CalendarEvent | null) => void
    refreshState: () => void
    refresh: number
    user: User
}


function EventDetails({currentEvent, setCurrentEvent, refreshState, refresh, user}: EventDetailsProps){
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(currentEvent.title);
    const [description, setDescription] = useState(currentEvent.description);
    const [date, setDate] = useState(currentEvent.date);
    const [time, setTime] = useState(currentEvent.time);
    const [location, setLocation] = useState(currentEvent.location);
    const [users, setUsers] = useState<User[]>([])
    const [invitee, setInvitee] = useState("");
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const [message, setMessage] = useState("")

    

    async function updateCalendarEvent(e: React.SubmitEvent){
        e.preventDefault();

        const updatedEvent: UpdatedCalendarEvent = {
            title: title,
            description: description,
            date: date,
            time: time,
            location: location
        }

        await updateEvent(currentEvent.id, updatedEvent);

        refreshState();
        setCurrentEvent(null);
    }

    async function deleteThisEvent(){
        const inviteList = await getInvitations()
        const ids = inviteList.filter((invite) => invite.eventId === currentEvent.id)
        for(const id of ids){
            await deleteInvitation(id.id);
        }
        await deleteEvent(currentEvent.id)
        setCurrentEvent(null);
        refreshState();
        window.alert("Event Deleted!")
    }

    async function sendInvitation(){

            if(!invitee){
                setMessage("Invitee not selected")
                return
            }

            const invitation: NewInvitation = {
                eventId: currentEvent.id,
                userId: Number(invitee),
                status: "pending"
            }
        
            const inviteList = await getInvitations()
            for(const invite of inviteList){
                if (invite.eventId === currentEvent.id && invite.userId === Number(invitee)){
                    setMessage("That user already has an invitation to this event.");
                    return
                    }
                }

        await postInvitation(invitation)
        setMessage("")
        setInvitee("")
        refreshState();
    }
    

    useEffect(() => {
        async function displayAttendees(){
        const invitations = await getInvitations()
        const invitesForCurrentEvent = invitations.filter((invites) => invites.eventId === currentEvent.id)
        const users = await getUsers()
        const attendees = invitesForCurrentEvent.map((invite) => {
        const matchingUser = users.find(
            (user) => user.id === invite.userId);

            return {
                name: matchingUser?.name ?? "Unknown",
                status: invite.status
            };
        });
        setAttendees(attendees);
    }
        displayAttendees()
    }, [refresh, currentEvent.id])

    

    //helper functions

    useEffect(() => { 

        async function getUsersList(){

            const userList: User[]  = await getUsers()
            const userListWithoutCreator = userList.filter((user) => user.id !== currentEvent.creatorId)
            setUsers(userListWithoutCreator)
        }

        getUsersList()

    }, [currentEvent.creatorId])


    return(
        <div className="event-card">
            <p>{currentEvent.title}</p>
            <p>{currentEvent.description}</p>
            <p>{currentEvent.date}</p>
            <p>{currentEvent.time}</p>
            <p>{currentEvent.location}</p>
            {user.id === currentEvent.creatorId ?
            <div>
                <button onClick={() => setEditMode(true)}>Edit Mode</button>
                <button onClick={()=> {deleteThisEvent()}}>Delete</button>
                <button onClick={sendInvitation}>Invite</button>
                <select value = {invitee} onChange={(e) => setInvitee(e.target.value)}>
                    <option value="" disabled>Select User</option>
                    {users.map((user: User) => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
                {message && <p>{message}</p>}
            </div>
            :
            <div></div>
            }
            <div>
                <h2>RSVPs</h2>
                {attendees.map((attendee) =>
                <div key={attendee.name}> 
                    <p>{attendee.name}</p>
                    <p>{attendee.status}</p>
                </div>
                )}
                <button onClick={() => setCurrentEvent(null)}>Close</button>
            </div>
        
            {editMode &&
            <form className="form-card" onSubmit={updateCalendarEvent}>
                <fieldset>
                    <legend>Edit Event</legend>
                    <label>Title</label>
                    <input required type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
                    <label>Description:</label>
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>
                    <label>Date:</label>
                    <input required type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
                    <label>Time:</label>
                    <input required type="time" value={time} onChange={(event) => setTime(event.target.value)}/>
                    <label>Location</label>
                    <input required type="text" value={location} onChange={(event) => setLocation(event.target.value)}/>
                    <button type="submit">Save Edits</button>
                    <button type="button" onClick={() => {setEditMode(false)}}>Close</button>
                </fieldset>
            </form>
            }
        </div>
    )
}


export default EventDetails