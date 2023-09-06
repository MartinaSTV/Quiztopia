import { useNavigate } from 'react-router-dom';
import './LoggedIn.scss';

const LoggedIn = ()=>{
    
    const navigate = useNavigate()

    const LogOut = ()=>{
        localStorage.removeItem('token'); 
        localStorage.removeItem('quizId');
        localStorage.removeItem('name');
        localStorage.removeItem('user')
        navigate('/LoggedOut');
    }
    const username =  localStorage.getItem('name')
    const token = localStorage.getItem('token')
    if(!token){ LogOut }

    return(
        <section className='loggedIn'>
            <p className='loggedIn__name'>Du är inloggad { username }</p>
            <button className='loggedIn_button' onClick={ LogOut }>Logga ut</button>
        </section>
    )
}
export default LoggedIn