type NavBarProps = {
    activateSignUp: () => void
}

function NavBar( { activateSignUp }: NavBarProps){


    return(
        <nav>
            <ul className="nav-ul">
                <li><button onClick={ activateSignUp }>Sign Up</button></li>
                <li><button onClick={ activateSignUp }>Login</button></li>
            </ul>
        </nav>
    )
}

export default NavBar