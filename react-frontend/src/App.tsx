import { useState } from 'react'
import './App.css'
import Login from "./components/Login";
import DashBoard from './components/DashBoard';
import LogOut from './components/LogOut';
import type { User } from './types/types';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  function liftUser(user: User): void{
    setUser(user)
  }

  function switchLogin(): void{
    if(isLoggedIn){
      setIsLoggedIn(false);
    }else{
      setIsLoggedIn(true);
    }
    console.log(isLoggedIn);
  }

  return (
    <>
      {isLoggedIn ?
      <>
        <LogOut switchLogin = {switchLogin}/>
        <DashBoard user = {user}/>
      </>
      :
        <Login switchLogin={switchLogin} liftUser = {liftUser} />
      }
    </>
  )
}

export default App
