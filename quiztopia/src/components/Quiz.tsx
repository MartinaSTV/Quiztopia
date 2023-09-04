import { PropsQuiz } from "../interface"

const Quiz= ({quiz, showQuestions}: PropsQuiz )=>{
    
    return(
        <article>
            <h6>{quiz.quizId}</h6>
            <p>User Namn: { quiz.username}</p>
            <button onClick ={ ()=>showQuestions(quiz.questions) }>Visa Frågor</button>
        </article>
    )
}
export default Quiz