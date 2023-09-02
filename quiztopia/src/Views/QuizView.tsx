import LoggedIn from "../components/LoggedIn/LoggedIn"
import Quizez from "../components/Quizez/Quizez";
import './QuizView.scss'

const QuizView = ()=>{

      const token: string | null = localStorage.getItem('token')

        return(
          <section>
                {token === null? <p>Du måste logga in</p> : <article><LoggedIn/></article>}
               { token === null ? '' : <article><Quizez/></article>}
          </section>
    )
}
export default QuizView