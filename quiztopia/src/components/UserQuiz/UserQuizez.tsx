import { deleteQuiz } from '../../GetData/QuizAPI'
import { useState } from 'react'
import './UserQuiz.scss'
import { PropsUserQuiz } from "../../interface"

const UserQuizes = ({quiz}: PropsUserQuiz ) => {

    const [userQuizesDeleteMessage, setDeletedQuizMessage] = useState<string>('')
    console.log(userQuizesDeleteMessage,'userQuizes')

    const deleteQuizez = async() => {
        await deleteQuiz(quiz.quizId)
        setDeletedQuizMessage('Ditt quiz är borttaget')
    }

    return(
        <section className="userQuiz">
            <p>{quiz.quizId}</p>
            <button className=' userQuiz__button' onClick={ deleteQuizez }>Ta bort quiz??</button>
            <p className='userQuiz__message'>{ userQuizesDeleteMessage }</p>
        </section>
    )
}
export default UserQuizes