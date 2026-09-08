import { getUsers } from "../services/userServices"
import { useState } from "react";
import { type User } from "../types/types";
import SignUp from "./SignUp";


type LoginProps = {
    switchLogin: () => void
    liftUser: (user: User)=> void
}

function Login( { switchLogin, liftUser }: LoginProps ){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [signUpIsActive, setSignUpIsActive] = useState(false)


    async function checkUserAuth(): Promise<void>{
        setMessage("")
        const users = await getUsers();
        const matchedUser = users.find((user) => user.email.toLowerCase().trim() === email.toLowerCase().trim() && user.password === password);

        if(matchedUser){
            switchLogin()
            liftUser(matchedUser);
        }else{
            setMessage("There is no user with those Credentials, Please create an account.")
        }
    }

    //helper functions

    function activateSignUp(){
        signUpIsActive ? 
        setSignUpIsActive(false) :
        setSignUpIsActive(true)
    }


    return(
        <div className="sign-up-container">
            {signUpIsActive ?
            <div>
                <SignUp activateSignUp = {activateSignUp}/>
            </div>
            :
            <form className="form-card login">
                <fieldset>
                    <legend>User Login</legend>
                    {message && <p>{message}</p>}
                    <label>Email: </label>
                    <input type="text" value={email} onChange= {(e) => {setEmail(e.target.value)}}/>
                    <label>Password: </label>
                    <input type="password" value={password} onChange= {(e) => {setPassword(e.target.value)}}/>
                    <button type="button" onClick = {checkUserAuth}>Login</button>
                    <button type="button" onClick={activateSignUp}>Sign Up</button>
                </fieldset>
            </form>
            }
        </div>
    )
}

export default Login