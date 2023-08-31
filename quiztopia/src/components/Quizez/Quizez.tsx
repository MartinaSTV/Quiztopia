import { useState }from 'react'
import { createQuiz, AddQuestionOnQuiz } from '../../GetData/QuizAPI'
import PlayGame from '../../Views/PlayGame'
import './Quiz.scss'

const Quizez = ()=>{

    const [quizName, setQuizName] = useState<string>('')
    const[ quizQuestion , setQuizQuestion ] = useState<string>('')
    const [quizAnswear, setQuizAnswear] = useState<string>('')

    const CreateQuizes = ()=>{
        try{
        createQuiz(quizName)
        }catch(error){
            console.log(error,'inget API svar')
        }
    }

    const CreateQuizQuestion = ()=>{
        AddQuestionOnQuiz( quizQuestion, quizAnswear )
    }

    return(
        <section className='quiz'>
             <h3 className="quiz__header">Skapa Quiz</h3>
            <article className="quiz__section">
                <label htmlFor="quizname">Välj Quiz namn</label>
                <input className="quiz__input" type="text" name="" id="quizname" value = { quizName } placeholder="Quiz Namn" onChange={(e)=>{ setQuizName(e.target.value)} } />
                <button onClick={ CreateQuizes }>Spara Quiz</button>
            </article>

            <article className='QuizQuestions'>
                <label htmlFor=""></label>
                <input type="text" placeholder='Skriv in fråga' value ={ quizQuestion } onChange={ (e)=>{ setQuizQuestion(e.target.value)}}/>
                <label htmlFor=""></label>
                <input type="text" placeholder='Skriv in svar på fråga' value={ quizAnswear } onChange = { (e)=>{ setQuizAnswear(e.target.value )} } />
                 <button onClick={ CreateQuizQuestion }>Lägg till Quiz</button>
            </article>
            <article>
                <PlayGame/>
            </article>
        </section>

    )
}
export default Quizez