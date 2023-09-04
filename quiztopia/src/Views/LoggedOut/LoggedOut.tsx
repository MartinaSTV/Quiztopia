import { useNavigate } from 'react-router-dom'
import './LoggedOut.scss'

const LoggedOut = () => {

    const navigate = useNavigate()

    const navigateToLogIn = ()=>{
        navigate('/LogIn')
    }

    return(
        <section className='loggedOut'>
            <p>Du är utloggad</p>
            <button className='loggedOut__button' onClick={ navigateToLogIn }>Logga in igen</button>
            <button className='loaggedOut__button' onClick={ ()=>{ navigate('/')}}>Tillbaka till Startsida</button>
        </section>
    )
}
export default LoggedOut