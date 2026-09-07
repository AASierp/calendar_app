import type { CalendarEvent, User } from "../types/types"
import CreateEvent from "./CreateEvent"
import EventList from "./EventList"
import { useState } from "react"
import EventDetails from "./EventDetails"
import InvitationList from "./InvitationList"
import EditProfile from "./EditProfile"

type DashBoardProps = {
    user: User
    liftUser: (user: User) => void
}

function DashBoard( { user, liftUser }: DashBoardProps  ){
const [refresh, setRefresh] = useState(0);
const [currentEvent, setCurrentEvent] = useState<CalendarEvent | null>(null)


//help functions
 function refreshState(): void{
    setRefresh(refresh + 1)
 }

 function liftEvent(event: CalendarEvent): void{
    setCurrentEvent(event)
 }


    return (
        <>
            <h1>{user.name}'s Dashboard</h1>
            <div className="dashboard-container">
                
                {currentEvent ?
                <div>
                    <EventDetails user={user} currentEvent = {currentEvent} setCurrentEvent = {setCurrentEvent} refreshState = {refreshState} refresh = {refresh}/>
                </div>
                :
                <>
                    <div>
                        <EventList user={user} refresh = { refresh } liftEvent = {liftEvent}/>
                    </div>
                    <div>
                        <InvitationList user={user} refreshState = { refreshState } refresh = {refresh}/>
                    </div>
                </>
                } 
                <div>
                    <CreateEvent user={user} refreshState = { refreshState }/>
                    <EditProfile user={user} liftUser = {liftUser}/>
                </div>
            </div>
        </>
    )
}

export default DashBoard