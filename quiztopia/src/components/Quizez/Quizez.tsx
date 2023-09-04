import { useState }from 'react'
import { createQuiz, AddQuestionOnQuiz, getQuizes } from '../../GetData/QuizAPI'
import PlayGame from '../../Views/PlayGame'
import UserQuizes from '../UserQuiz/UserQuizez'
import './Quizez.scss'
import { QuizesResponse } from '../../interface'

const Quizez = ()=>{

    const [quizName, setQuizName] = useState<string>('')
    const[ quizQuestion , setQuizQuestion ] = useState<string>('')
    const [quizAnswear, setQuizAnswear] = useState<string>('')
    const [hideQuizButton ,setQuizbutton] = useState<boolean>(true)

    //hämta cordinaterna från frågor ifrån PlayGame viewn
    const [latToQuestion, setlatToQuestion] = useState<number>(0)
    const [lngToQuestion, setlngToQuestion] = useState<number>(0)
    console.log(latToQuestion, lngToQuestion, 'korr till frågor')

    //hämta user quizes
    const [quizesResponse, setGetQuiz ]= useState<QuizesResponse[] | []>([])
    const [ userQuizes, setUserQuizes] = useState<QuizesResponse[] | []>([])

    console.log(quizesResponse)
    
    // skicka till MapBox i PlayGame
    let click = 0
 
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
        setQuizQuestion('')
        setQuizAnswear('')
        }
        catch(error){
            console.log( 'ingen fråga kunde skickas')
        }
        //funkar ej
        click = 0
    }

    //måste klicka två gånger?? annars inne i else
    const showYourQuizes = async()=>{
    try{ 
       await getQuizes( setGetQuiz );
       filterQuizes()

      }catch(error){
        console.log('inget API')
      }
     
    } 
    const filterQuizes = ()=>{
            const username =  localStorage.getItem('name')
            if(quizesResponse.length > 0 ){
            const userQuizes = quizesResponse.filter((quiz) =>  quiz.username === username )
            setUserQuizes( userQuizes)
    
            }else { console.log( 'INNE I ELSE')}
    }

      const UserQuizElem = userQuizes.map((quiz, index)=> <UserQuizes quiz = { quiz } key ={ index }/> )

      

    return(
        <section className='quizez'>
             <h3 className="quizez__header">Skapa Quiz</h3>
             <button onClick={ showYourQuizes }>Visa dina quiz</button>
             <article className='quizes__UserQuizElem'> { UserQuizElem } </article>
            <article className="quizez__section">
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
                <PlayGame setlngToQuestion = { setlngToQuestion} setlatToQuestion ={ setlatToQuestion } click = { click }/>
            </article>
        </section>
    )
}
export default Quizez