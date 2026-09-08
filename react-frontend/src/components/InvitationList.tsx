import { getEvents } from "../services/eventServices"
import { getInvitations, updateInvitation } from "../services/invitationServices"
import type { User, Invitation, CalendarEvent, UpdatedInvitation } from "../types/types"
import { useState, useEffect } from "react"

type invitationProps = {
    user: User
    refreshState: () => void
    refresh: number
}

function InvitationList({ user, refreshState, refresh}: invitationProps){
    const [invitations, setInvitations] = useState<Invitation[]>([])
    const [events, setEvents] = useState<CalendarEvent[]>([])

    useEffect(() => {
        async function fetchInvitationsAndEvents(){
            const invitations = await getInvitations()
            const events = await getEvents()
            setInvitations(invitations);
            setEvents(events)
        }

        fetchInvitationsAndEvents()
    },[user.id, refresh])

    function filterInvitations(): Invitation[]{
        const userInvitations = invitations.filter((invite) => invite.userId === user.id);
        return userInvitations
    }

    const filteredUserInvitations = filterInvitations();

    async function updateInviteStatus (invite: Invitation, status: "accepted" | "declined"){
        const newStatus: UpdatedInvitation = {
            status: status
        }

        await updateInvitation(invite.id, newStatus)
        refreshState();
    }



    return(
        <>
            <h2>Your Invitations</h2>
       
                
                {filteredUserInvitations.map((invite) => {const event = events.find((event) => event.id === invite.eventId); 
                    return (
                        
                        <div key={invite.id} className="event-card">
                            <h3 style={{color: "#d9b44a"}}>{event?.title}</h3>
                            <p>Date: {event?.date}</p>
                            <p>Time: {event?.time}</p>
                            <p>Location: {event?.location}</p>
                            <p>Status: {invite.status}</p>
                            <p>=============</p>
                            <p style={{color: "#d9b44a"}}>RSVP</p>
                            <button onClick={() => {updateInviteStatus(invite, "accepted")}}>Accept</button>
                            <button onClick={() => {updateInviteStatus(invite, "declined")}}>Decline</button>
                        </div>
                
                    );

                })}
           
        </>
    )
}

export default InvitationList