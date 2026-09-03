import type { User } from "../types/types";

const URL = "http://localhost:3001/users"

export async function getUsers(){

    try{
        const response = await fetch(URL);
        if(!response.ok){
            throw new Error("Failed to fetch users data.")
        }
        const data = response.json();
        return data;

    }
    catch(error){
        console.error(error);
    }    
}

export async function postUser(user: User){

    try{
        const response = await fetch(URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        })
        const status = response.status;
        if(!response.ok){
            throw new Error(`Unable to save user - ${status}`);
        }else{
            window.alert("User Saved");
        }

    }
    catch(error){
        console.error(error)
    }
}