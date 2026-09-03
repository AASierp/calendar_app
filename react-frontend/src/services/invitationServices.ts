import type { Invitation, NewInvitation, UpdatedInvitation } from "../types/types";

const URL = "http://localhost:3001/invitations"

export async function getInvitations(): Promise<Invitation[]>{
    try {
        const response = await fetch(URL);
        if(!response.ok){
            throw new Error("Failed to fetch invitations")
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);        
    }
    return [];
}

export async function postInvitation(invite: NewInvitation): Promise<void>{
    try{
        const response = await fetch(URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(invite)
        })
        if(!response.ok){
            throw new Error("Invitation could not be saved.");
        }        
    }catch(error){
        console.error(error)
    }
}

export async function updateInvitation(inviteId: number, updatedInvitation: UpdatedInvitation): Promise<void>{
    try{

        const response = await fetch(`${URL}/${inviteId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(updatedInvitation)
        });
        if(!response.ok){
            throw new Error("Could not update invitation.")
        }
    }catch(error){
        console.error(error);
    }
}