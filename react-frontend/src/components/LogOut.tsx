type LogOutProps = {
    switchLogin: () => void
}

function LogOut( { switchLogin }: LogOutProps){

    return(
        <button type="button" onClick={switchLogin}> Log Out </button>
    )
}

export default LogOut