import { useNavigate } from 'react-router-dom';
import './LoggedIn.scss';

const LoggedIn = ()=>{
    
    const navigate = useNavigate()

    // Navigera till utloggad
    const LogOut = ()=>{
        localStorage.setItem('token', JSON.stringify('')); 
        navigate('/LoggedOut');

    }

    //Skriv ut vem som är inloggad
    return(
        <section className='loggedIn'>
            <p>Du är inloggad</p>
            <button className='loggedIn_button' onClick={ LogOut }>Logga ut</button>
        </section>
    )
}
export default LoggedIn