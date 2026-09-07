import { useState } from "react"
import type { UpdatedUser, User } from "../types/types";
import { updateUser } from "../services/userServices";

type EditProfileProps = {
    user: User
    liftUser: (user: User) => void
}

function EditProfile( {user, liftUser}: EditProfileProps ){
    
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    async function UpdateProfile(e: React.SubmitEvent) {
        e.preventDefault()

        const profileUpdate: UpdatedUser = {
            name: name,
            email: email,
            password: password
        }

        await updateUser(user.id, profileUpdate)
     
        const userToLift: User = {
            id: user.id,
            name: name,
            email: email,
            password: password
        }
        liftUser(userToLift)
    }


    return(
        
        <form className="form-card" onSubmit={UpdateProfile}>
            <fieldset>
                <legend>Edit Profile</legend>
                <label>Name: </label>
                <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <button type="submit">Update</button>
            </fieldset>
        </form>
        
    )
}

export default EditProfile