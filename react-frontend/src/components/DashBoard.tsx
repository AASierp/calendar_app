import type { CalendarEvent, User } from "../types/types"
import CreateEvent from "./CreateEvent"
import EventList from "./EventList"
import { useState } from "react"
import EventDetails from "./EventDetails"
import InvitationList from "./InvitationList"

type DashBoardProps = {
    user: User
}

function DashBoard( { user }: DashBoardProps  ){
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
                    <EventDetails currentEvent = {currentEvent} setCurrentEvent = {setCurrentEvent} refreshState = {refreshState}/>
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
                </div>
            </div>
        </>
    )
}

export default DashBoard