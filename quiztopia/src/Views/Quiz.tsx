import LoggedIn from "../components/LoggedIn"
import { useState } from 'react'
import { createQuiz } from "../GetData/QuizAPI"

//import  MapBox  from '../components/MapBox'
import './QuizStyle.scss'

const CreateQuiz = ()=>{

    const [quizName, setQuizName] = useState<string>('')

    const CreateQuizes = ()=>{
        createQuiz(quizName)
    }

        return(
        <section className="quiz">
            <article><LoggedIn/></article>
            <h3 className="quiz__header">Quiz</h3>
            <article className="quiz__section">
                <label htmlFor="quizname">Välj Quiz namn</label>
                <input className="quiz__input" type="text" name="" id="quizname" value = { quizName } placeholder="Quiz Namn" onChange={(e)=>{ setQuizName(e.target.value)} } />
                <button onClick={ CreateQuizes }>Spara Quiz</button>
            </article>

            <article>
                {/* <MapBox/>  */}
            </article>

        </section>
    )
}

export default CreateQuiz