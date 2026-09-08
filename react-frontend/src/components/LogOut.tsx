type LogOutProps = {
    switchLogin: () => void
}

function LogOut( { switchLogin }: LogOutProps){

    return(
        <div className="logout-container">
            <button className="logout" type="button" onClick={switchLogin}> Log Out </button>
        </div>
    )
}

export default LogOut