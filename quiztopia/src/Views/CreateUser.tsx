import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { createAccount } from '../GetData/UserAPI';
import './Createuser.scss'

const CreateUser = ()=>{

    let [username, setUsername]= useState<string>('')
    let [password, setpassword]= useState<string>('')

    const navigate = useNavigate()
    const navigateToLogIn = ()=>{
        navigate('/LogIn')

    }
    const makeAccount = async()=>{
        await createAccount(username, password)
    } 

    return(
        <section className='createUser'>
            <h4>Skapa Konto</h4>
            <button onClick={ navigateToLogIn }>Har redan konto, gå till logga in</button>
            <p>Välj Användar namn och Lösenord</p>
            <input className='createUser__input' type="text" placeholder='Username' value={ username } onChange={ (e)=>{ setUsername(e.target.value)}} />
            <input className='createUser__input' type="text" placeholder='password' value={ password } onChange={ (e)=>{ setpassword(e.target.value)}}/>
            <button onClick={ makeAccount  }>Skapa Konto</button>
        </section>
    )
}
export default CreateUser