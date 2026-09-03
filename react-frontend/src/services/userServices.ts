import type { NewUser, UpdatedUser, User} from "../types/types";

const URL = "http://localhost:3001/users"

export async function getUsers(): Promise<User[]> {

    try{
        const response = await fetch(URL);
        if(!response.ok){
            throw new Error("Failed to fetch users data.")
        }
        const data =  await response.json();
        return data;

    }
    catch(error){
        console.error(error);
    }
    return[];    
}

export async function postUser(newuser: NewUser): Promise<void>{

    try{
        const response = await fetch(URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newuser)
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

export async function updateUser(userId: number, user: UpdatedUser): Promise<void>{
    try{

        const response = await fetch(`${URL}/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(user)
        });
        if(!response.ok){
            throw new Error("Could not update user.")
        }
        window.alert("User Updated");
    }catch(error){
        console.error(error);
    }
}