import { useNavigate } from 'react-router-dom';

const CreateUser = ()=>{

    const navigate = useNavigate()
    const navigateToLogIn = ()=>{
        navigate('/LogIn')

 }

    return(
        <section>
            <p>Skapa Konto</p>
            <button onClick={ navigateToLogIn }>Har redan konto, gå till logga in</button>
        </section>
    )
}
export default CreateUser