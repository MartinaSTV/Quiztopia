import { useState }from 'react'

const LogIn = ()=>{

    let [username, setUsername]= useState<string>('')
    let [password, setpassword]= useState<string>('')

    const createAccount = async()=>{
        //create Accoutn
        const url =  'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'
        const setings =  {
            method:'POST',
            body:JSON.stringify({ username: username,
                password: password})
        }

        const response = await fetch(url, setings )
        const data: DataResponseCreateAccount = await response.json()
        console.log(data)

        try{

        }catch(error){
            console.log(error,'error')
        }
    }

    const LogInExisitingAccont = async()=>{

        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login' 
        const setings =  {
            method:'POST',
            body:JSON.stringify({ username: username,
                password: password})
        }
        const response = await fetch(url, setings )
        const data: DataResponseLoggedIn = await response.json()
        console.log(data)
        if (data.token){  localStorage.setItem('token', JSON.stringify(data.token))}else{
            console.log('du är inte inlogad')

        }
    }

   
    
    return(
        <section>
            
            <input type="text" placeholder='Username' value={ username } onChange={ (e)=>{ setUsername(e.target.value)}} />
            <input type="text" placeholder='password' value={ password } onChange={ (e)=>{ setpassword(e.target.value)}}/>
            <button onClick={ createAccount  }>Skapa Konto</button>
            <button onClick={ LogInExisitingAccont }>Logga in</button>
        </section>
    )
}
export default LogIn