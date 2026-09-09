import type { CalendarEvent, User } from "../types/types"
import CreateEvent from "../components/CreateEvent"
import EventList from "../components/EventList"
import { useState } from "react"
import EventDetails from "../components/EventDetails"
import InvitationList from "../components/InvitationList"
import EditProfile from "../components/EditProfile"

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
            <div className="heading-container">
                <h1>{user.name}'s Dashboard</h1>
                <hr />
            </div>
            <div className="dashboard-container">
                
                {currentEvent ?
                <div className="col-1">
                    <EventDetails user={user} currentEvent = {currentEvent} setCurrentEvent = {setCurrentEvent} refreshState = {refreshState} refresh = {refresh}/>
                </div>
                :
               
                <div className="col-1">
                    <EventList user={user} refresh = { refresh } liftEvent = {liftEvent}/>
                </div>
                
                }
                <div className="col-2">
                    <InvitationList user={user} refreshState = { refreshState } refresh = {refresh}/>
                </div> 
                <div className="col-3">
                    <CreateEvent user={user} refreshState = { refreshState }/>
                    <EditProfile user={user} liftUser = {liftUser}/>
                </div>
            </div>
        </>
    )
}

export default DashBoard