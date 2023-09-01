import { useState }from 'react'
import { createQuiz, AddQuestionOnQuiz } from '../../GetData/QuizAPI'
import PlayGame from '../../Views/PlayGame'
import './Quizez.scss'

const Quizez = ()=>{

    const [quizName, setQuizName] = useState<string>('')
    const[ quizQuestion , setQuizQuestion ] = useState<string>('')
    const [quizAnswear, setQuizAnswear] = useState<string>('')
    const [hideQuizButton ,setQuizbutton] = useState<boolean>(true)

    const CreateQuizes = ()=>{
        try{
        createQuiz(quizName);
        setQuizbutton(false);

        }catch(error){
            console.log(error,'inget API svar')
        }
    }

    const CreateQuizQuestion = async()=>{
        await AddQuestionOnQuiz( quizQuestion, quizAnswear )
        console.log('createQuizQuestion button')
    }

    return(
        <section className='quizez'>
             <h3 className="quizez__header">Skapa Quiz</h3>
            <article className="quizez__section">
                { hideQuizButton? <label htmlFor="quizname">Välj Quiz namn</label> : ''}
             { hideQuizButton? <input className="quizez__input" type="text" name="" id="quizname" value = { quizName } placeholder="Quiz Namn" onChange={(e)=>{ setQuizName(e.target.value)} } onFocus={(e)=>{ setQuizName('')}  } /> : ''}
               { hideQuizButton? <button  onClick={ CreateQuizes }>Spara Quiz</button>: <button onClick={  ()=>{ CreateQuizes; setQuizbutton(true); setQuizQuestion('') }} className='quizez__NewQuiz'>Skapa Nytt Quiz</button> }
            </article>

           {!hideQuizButton? <article className='quizez__quizQuestions'>
                <label htmlFor=""></label>
                <input className=' quizez__input' type="text" placeholder='Skriv in fråga' value ={ quizQuestion } onChange={ (e)=>{ setQuizQuestion(e.target.value)}} onFocus={ ()=>{setQuizQuestion('')}  }/>
                <label htmlFor=""></label>
                <input className=' quizez__input'  type="text" placeholder='Skriv in svar på fråga' value = { quizAnswear } onFocus={ ()=>{setQuizAnswear('')} } onChange = { (e)=>{ setQuizAnswear(e.target.value )} } />
                 <button onClick={ ()=>{ setQuizAnswear(''); setQuizQuestion('');  CreateQuizQuestion;} }>Lägg till Fråga till Quiz</button>
            </article>: ''}
            <article>
                <PlayGame/>
            </article>
        </section>

    )
}
export default Quizez