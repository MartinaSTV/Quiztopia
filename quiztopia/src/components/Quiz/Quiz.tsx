import { PropsQuiz } from "../../interface"
import './Quiz.scss'

const Quiz= ({quiz, showQuestions}: PropsQuiz ) => {
    
    return(
        <article className="quiz">
            <h4>{quiz.quizId}</h4>
            <p className=" quiz__username">Skriven av { quiz.username}</p>
            <button className="quiz__button" onClick ={ () => showQuestions(quiz.questions) }>Visa Frågor</button>
        </article>
    )
}
export default Quiz