import { useNavigate } from 'react-router-dom'

const LoggedOut = ()=>{

    const navigate = useNavigate()

    const navigateToLogIn = ()=>{
        navigate('/LogIn')
    }

    return(
        <section className='loggedOut'>
            <p>Du är utloggad</p>
            <button onClick={ navigateToLogIn }>Logga in igen</button>
        </section>
    )
}
export default LoggedOut