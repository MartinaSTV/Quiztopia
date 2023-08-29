
const LoggedIn = ()=>{

    // Navigera till utloggad
    const LogOut = ()=>{
        localStorage.setItem('token', JSON.stringify('')); 
    }

    //Skriv ut vem som är inloggad
    return(
        <section>
            <p>Du är inloggad</p>
            <button onClick={ LogOut }>Logga ut</button>
        </section>
    )
}
export default LoggedIn