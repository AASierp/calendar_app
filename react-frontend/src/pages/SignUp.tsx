import { getUsers, postUser } from "../services/userServices"
import type { NewUser } from "../types/types";
import { useState } from "react";

type SignUpProps = {
    activateSignUp: () => void
}

function SignUp( {activateSignUp}: SignUpProps){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("")


    async function handleSignUp(e: React.SubmitEvent){
        e.preventDefault();

        setMessage("");

        const newUser: NewUser = {
            name: name.trim(),
            email: email.trim(),
            password: password
        }

        if(!validateEmail()){
            setMessage("Your email must be at least 8 characters in length and contain an '@' symbol");
            return;
        }

        if(!validatePassword()){
            setMessage("Your password must be at least 8 characters in length");
            return;
        }

        const users = await getUsers();

        if(users.find((user) => user.email.toLowerCase().trim() === newUser.email.toLowerCase().trim())){
            setMessage("A user with that email address already exists");
            return;
        }

        await postUser(newUser);

        setEmail("")
        setPassword("")
        setName("")
        
        activateSignUp();
    }

    //helper functions

    function validateEmail(): boolean{
        if(email.length < 8 || !email.includes("@")){
            return false
        }
        return true
    }

    function validatePassword(): boolean{
        if(password.length < 8){
            return false;
        }
        return true;
    }

    return(
        <div>
            <form className="form-card sign-up" onSubmit={handleSignUp}>
                <fieldset>
                    <legend>Sign Up</legend>
                    <label htmlFor="name">Name:</label>
                    <input required type="text" id="name"  value={name} onChange={(e) => {setName(e.target.value)}} />
                    <label htmlFor="email">Email:</label>
                    <input required type="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    <label htmlFor="password">Password:</label>
                    <input required type="password" id="password"  value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={activateSignUp}>Cancel</button>
                    {message && <p>{message}</p>}
                </fieldset>
            </form>
        </div>
    )
}

export default SignUp