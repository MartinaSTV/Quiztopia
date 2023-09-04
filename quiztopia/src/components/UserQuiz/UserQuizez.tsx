import { SpeificQuizFromUser } from "../../GetData/QuizAPI"
import { useState } from 'react'
import './UserQuiz.scss'
import { PropsUserQuiz } from "../../interface"

const UserQuizes = ({quiz}: PropsUserQuiz ) => {

    const [userQuizesDelete, setDeletedQuiz] = useState<string>()
    console.log(userQuizesDelete,'userQuizes')

    const yourQuiz = async()=>{
        try{
             await SpeificQuizFromUser( setDeletedQuiz )

        }catch(error){
            console.log('Kunde inte hämta API')
        }
    }

    return(
        <section className="userQuiz">
            <p>{quiz.quizId}</p>
            <button onClick={ yourQuiz }>Ta bort quiz??</button>
        </section>
    )
}

export default UserQuizes