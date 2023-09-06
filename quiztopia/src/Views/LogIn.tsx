import { useState }from 'react'
import { LogInExisitingAccont } from '../GetData/UserAPI'
import { useNavigate } from 'react-router-dom';
import './LogIn.scss'

const LogIn = ()=>{

    const [username, setUsername]= useState<string>('');
    const [password, setpassword]= useState<string>('');
    const [message, setMessage]= useState<string>('')

    localStorage.setItem('name',username)

    const navigate = useNavigate()

   const logInExisitingAccont = async()=>{
    try{
      await LogInExisitingAccont( username, password);
      
    }catch(error){
        setMessage('Kunde inte logga in');
    }
    const token: string = JSON.parse(localStorage.getItem('token') || '')
    if( !token ){  setMessage('Kunde inte logga in'); }
    else{ navigate('/CreateQuiz');
    }
   }

    return(
        <section className='logIn'>
            <h4>Logga In</h4>
            <input className='logIn__input' type="text" placeholder='Username' value={ username } onChange={ (e)=>{ setUsername(e.target.value)}} />
            <input className='logIn__input' type="password" placeholder='password' value={ password } onChange={ (e)=>{ setpassword(e.target.value)}}/>
            <button onClick={ logInExisitingAccont }>Logga in</button>
            <p>{ message }</p>
        </section>
    )
}
export default LogIn