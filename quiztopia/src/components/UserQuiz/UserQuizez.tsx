import { deleteQuiz } from '../../GetData/QuizAPI'
import { useState } from 'react'
import './UserQuiz.scss'
import { PropsUserQuiz } from "../../interface"

// skicka hit quizname till quizId

const UserQuizes = ({quiz, quizName}: PropsUserQuiz ) => {

    console.log('quizi userquises', quiz)

    const [userQuizesDeleteMessage, setDeletedQuizMessage] = useState<string>('')
    const [showQuestionS, setShowQ] = useState<boolean>(false)

    const deleteQuizez = async() => {
        await deleteQuiz(quiz.quizId)

    }
    const showQuestions = () => {
        setShowQ(!showQuestionS)
    }
    const questionsElem = quiz.questions.map((question, index)=> <p key = { index } className='userQuiz__questions'>{question.question} Latitude {question.location.latitude} Longitude {question.location.longitude} Svar: { question.answer }</p>)

    return(
        <section className="userQuiz">
            <p className='userQuiz__quizName'>{quiz.quizId}</p>
            <button className=' userQuiz__button'  onClick={ showQuestions }>Se frågor</button>
            {showQuestionS? <article className='useQuiz__questions'>{ questionsElem }</article>: null}
            <button className=' userQuiz__button' onClick={ deleteQuizez }>Ta bort quiz??</button>
            <p className='userQuiz__message'>{ userQuizesDeleteMessage }</p>
        </section>
    )
}
export default UserQuizes