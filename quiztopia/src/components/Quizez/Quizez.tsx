import { useState }from 'react'
import { createQuiz, AddQuestionOnQuiz, SpeificQuizFromUser } from '../../GetData/QuizAPI'
import PlayGame from '../../Views/PlayGame'
import './Quizez.scss'

const Quizez = ()=>{

    const [quizName, setQuizName] = useState<string>('')
    const[ quizQuestion , setQuizQuestion ] = useState<string>('')
    const [quizAnswear, setQuizAnswear] = useState<string>('')
    const [hideQuizButton ,setQuizbutton] = useState<boolean>(true)

    //hämta cordinaterna från frågor ifrån PlayGame viewn
    const [latToQuestion, setlatToQuestion] = useState<number>(0)
    const [lngToQuestion, setlngToQuestion] = useState<number>(0)
    // skicka till Map i PlayGame
    const [removeQuestionMark , setRemoveQuestionMark] = useState(true)
 
    const CreateQuizes = async()=>{
        try{
        await createQuiz(quizName);
        setQuizbutton(false);

        }catch(error){
            console.log(error,'inget API svar')
            setQuizbutton(true)
        }
    }

    const CreateQuizQuestion = async()=>{
        try{
        await AddQuestionOnQuiz( quizQuestion, quizAnswear, lngToQuestion, latToQuestion )
        console.log('createQuizQuestion button')
        setRemoveQuestionMark(false)
        }
        catch(error){
            console.log( 'ingen fråga kunde skickas')
        }
    }
    const showYourQuizes = async()=>{
        const QuestionResponse =  await SpeificQuizFromUser()
        console.log(QuestionResponse)
    }

    return(
        <section className='quizez'>
             <h3 className="quizez__header">Skapa Quiz</h3>
            <article className="quizez__section">
                 <button onClick={ showYourQuizes }>Visa dina Quiz</button>
                { hideQuizButton? <label htmlFor="quizname">Välj Quiz namn</label> : ''}
             { hideQuizButton? <input className="quizez__input" type="text" name="" id="quizname" value = { quizName } placeholder="Quiz Namn" onChange={(e)=>{ setQuizName(e.target.value)} } onFocus={()=>{ setQuizName('')}  } /> : ''}
               { hideQuizButton? <button  onClick={ CreateQuizes }>Spara Quiz</button>: <button onClick={  ()=>{ CreateQuizes; setQuizbutton(true); setQuizQuestion('') }} className='quizez__NewQuiz'>Skapa Nytt Quiz</button> }
            </article>

           {!hideQuizButton? <article className='quizez__quizQuestions'>
                <label htmlFor="quizQst"></label>
                <input className=' quizez__input' id='quizQst' type="text" placeholder='Skriv in fråga' value ={ quizQuestion } onChange={ (e)=>{ setQuizQuestion(e.target.value)}} onFocus={ ()=>{setQuizQuestion('')}  }/>
                <label htmlFor="quizAsw"></label>
                <input className=' quizez__input' id='quizAsw' type="text" placeholder='Skriv in svar på fråga' value = { quizAnswear } onFocus={ ()=>{setQuizAnswear('')} } onChange = { (e)=>{ setQuizAnswear(e.target.value )} } />

                 <button onClick={ CreateQuizQuestion }>Lägg till Fråga till Quiz</button>

            </article>: ''}
            <article>
                <PlayGame setlngToQuestion = { setlngToQuestion} setlatToQuestion ={ setlatToQuestion }  />
            </article>
        </section>

    )
}
export default Quizez