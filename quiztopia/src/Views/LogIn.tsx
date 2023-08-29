import { useState }from 'react'
import { LogInExisitingAccont } from '../GetData/UserAPI'
import { useNavigate } from 'react-router-dom';
import './LogIn.scss'

const LogIn = ()=>{

    let [username, setUsername]= useState<string>('');
    let [password, setpassword]= useState<string>('');

    const navigate = useNavigate()

   const logInExisitingAccont = async()=>{
      await LogInExisitingAccont( username, password);
      navigate('/CreateQuiz')
      
   }

    return(
        <section className='logIn'>
            <h4>Logga In</h4>
            <input className='logIn__input' type="text" placeholder='Username' value={ username } onChange={ (e)=>{ setUsername(e.target.value)}} />
            <input className='logIn__input' type="text" placeholder='password' value={ password } onChange={ (e)=>{ setpassword(e.target.value)}}/>
            <button onClick={ logInExisitingAccont }>Logga in</button>
        </section>
    )
}
export default LogIn