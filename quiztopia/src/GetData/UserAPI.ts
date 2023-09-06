import { DataResponseCreateAccount, DataResponseLoggedIn } from "../interface"

const createAccount = async( username:string, password: string) => {
    const url =  'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'
    const setings =  {
        method:'POST',
        body:JSON.stringify({ username: username,
            password: password})
    }

    const response = await fetch(url, setings )
    const data: DataResponseCreateAccount = await response.json()
    console.log(data)
}

const LogInExisitingAccont = async(username:string, password:string) => {

    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login' 
    const setings =  {
        method:'POST',
        body:JSON.stringify({ username: username,
            password: password})
    }
    const response = await fetch(url, setings )
    const data: DataResponseLoggedIn = await response.json()
    if (data.token){  localStorage.setItem('token', JSON.stringify(data.token))}else{
        console.log('du är inte inlogad')
    }
}

export { createAccount, LogInExisitingAccont }