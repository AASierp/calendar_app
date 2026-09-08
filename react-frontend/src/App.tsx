import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import LogOut from './components/LogOut';
import type { User } from './types/types';
import Footer from './components/Footer';

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
      {isLoggedIn && user ?
      <div>
        <div>
          <LogOut switchLogin = {switchLogin}/>
        </div>
        <div>
          <DashBoard user = {user} liftUser = {liftUser}/>
        </div>
      </div>
      :
        <Login switchLogin={switchLogin} liftUser = {liftUser} />
      }
      <Footer />
    </>
  )
}

export default App
