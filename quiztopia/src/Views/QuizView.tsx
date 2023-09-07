import LoggedIn from "../components/LoggedIn/LoggedIn"
import Quizez from "../components/Quizez/Quizez";
import './QuizView.scss'
import { useLocation } from "react-router-dom";

const QuizView = ()=>{
      const user = useLocation()
      const name = user.state.username
      
      const token: string | null = localStorage.getItem('token')

        return(
          <section>
                {token === null? <p>Du måste logga in</p> : <article><LoggedIn name = { name }/></article>}
               { token === null ? '' : <article><Quizez name = { name }/></article>}
          </section>
    )
}
export default QuizView