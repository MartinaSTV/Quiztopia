import LoggedIn from "../components/LoggedIn/LoggedIn"
import Quizez from "../components/Quizez/Quizez";
import './QuizView.scss'

const QuizView = ()=>{

        return(
          <section>
                <article><LoggedIn/></article>
                <article><Quizez/></article>
          </section>
    )
}
export default QuizView