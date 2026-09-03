import { getUsers } from "../services/userServices"
import { useState } from "react";
import { type User } from "../types/types";

type LoginProps = {
    switchLogin: () => void
    liftUser: (user: User)=> void
}

function Login( { switchLogin, liftUser }: LoginProps ){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    

    async function checkUserAuth(){
        setMessage("")
        const users = await getUsers();
        const matchedUser = users.find((user) => user.email === email && user.password === password);

        if(matchedUser){
            switchLogin()
            liftUser(matchedUser);
        }else{
            setMessage("There is no user with those Credentials, Please create an account.")
        }

            
    }

    return(
        <div>
            <form>
                <fieldset>
                    <legend>User Login</legend>
                    {message && <p>{message}</p>}
                    <label>Email: </label>
                    <input type="text" value={email} onChange= {(e) => {setEmail(e.target.value)}}/>
                    <label>Password: </label>
                    <input type="password" value={password} onChange= {(e) => {setPassword(e.target.value)}}/>
                    <button type="button" onClick = {checkUserAuth}>Login</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login