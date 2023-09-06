import { useState }from 'react'
import { createQuiz, AddQuestionOnQuiz, getQuizesAgainTest } from '../../GetData/QuizAPI'
import PlayGame from '../../Views/PlayGame'
import UserQuizes from '../UserQuiz/UserQuizez'
import './Quizez.scss'
import { QuizesResponse } from '../../interface'

const Quizez = ()=>{

    const [quizName, setQuizName] = useState<string>('');
    const[ quizQuestion , setQuizQuestion ] = useState<string>('');
    const [quizAnswear, setQuizAnswear] = useState<string>('');
    const [toggelQustionButton ,setToggelQuestionButton] = useState<boolean>(false)
    const [hideQuizButton ,setQuizbutton] = useState<boolean>(true);
    const [messageQuizError, setMessageQuizError] = useState<string>('');
    const [quizQuestionMessage , setQuizQuestionMessage ]= useState<string>('')

    //hämta cordinaterna från frågor ifrån "PlayGame"
    const [latToQuestion, setlatToQuestion] = useState<number>(0);
    const [lngToQuestion, setlngToQuestion] = useState<number>(0);
    console.log(latToQuestion, lngToQuestion, 'korr till frågor');

    //hämta user quizes sorterade från apit
    const [ userQuizes, setUserQuizes] = useState<QuizesResponse[] | []>([]);
    
    // skicka till MapBox i PlayGame
    let click = 0
 
    const CreateQuizes = async()=>{
        try{
        await createQuiz(quizName, setMessageQuizError);
        setQuizbutton(false);

        }catch(error){
            setMessageQuizError('kunde inte skapa Quiz')
            setQuizbutton(true);
        }
    }

    const CreateQuizQuestion = async()=>{
        try{
        await AddQuestionOnQuiz( quizQuestion, quizAnswear, lngToQuestion, latToQuestion, setQuizQuestionMessage );
        setQuizQuestion('');
        setQuizAnswear('');
        click = 0
        }
        catch(error){
            setQuizQuestionMessage('Kunde inte lägga till fråga')
        }
    }

    const showYourQuizes = async()=>{
        getQuizesAgainTest( setUserQuizes );
        setToggelQuestionButton(!toggelQustionButton);
    } 
    const UserQuizElem = userQuizes.map((quiz, index)=> <UserQuizes quiz = { quiz } key ={ index }/> )

    return(
        <section className='quizez'>
            <article className="quizez__section">
                <h3>Skapa Quiz</h3>
                { hideQuizButton? <label htmlFor="quizname">Skriv in Quiz namn</label> : ''}
             { hideQuizButton? <input className="quizez__input" type="text" name="" id="quizname" value = { quizName } placeholder="Quiz Namn" onChange={(e)=>{ setQuizName(e.target.value)} } onFocus={()=>{ setQuizName('')}  } /> : ''}
               { hideQuizButton? <button  onClick={ CreateQuizes }>Spara Quiz</button>: null }
            </article>

           {!hideQuizButton? <article className='quizez__quizQuestions'>
                 <p className='quizez__errorMesage'>{ messageQuizError }</p>
                <label htmlFor="quizQst">Skriv in fråga och svar, välj sedan en plats på kartan genom att klicka på kartan för att lägga till fråga.</label>
                <input className=' quizez__input' id='quizQst' type="text" placeholder='Skriv in fråga' value ={ quizQuestion } onChange={ (e)=>{setQuizQuestion(e.target.value)}} onFocus={ ()=>{setQuizQuestion('')}  }/>
                <label htmlFor="quizAsw"></label>
                <input className=' quizez__input' id='quizAsw' type="text" placeholder='Skriv in svar på fråga' value = { quizAnswear } onFocus={ ()=>{setQuizAnswear('')} } onChange = { (e)=>{ setQuizAnswear(e.target.value )} } />
                 <button onClick={ CreateQuizQuestion }>Lägg till Fråga till Quiz</button>
                 <p>{ quizQuestionMessage }</p>
            </article>: ''}

            <button className='quizez__showYourQuizez' onClick={ showYourQuizes }>Visa dina quiz</button>
             { toggelQustionButton? <article className='quizez__UserQuizElem'> { UserQuizElem } </article> : null}
            { !hideQuizButton?  <button onClick={  ()=>{ CreateQuizes; setQuizbutton(true); setQuizQuestion('') }} className='quizez__NewQuiz'>Skapa Nytt Quiz</button> : null}

            <article>
                <PlayGame setlngToQuestion = { setlngToQuestion} setlatToQuestion ={ setlatToQuestion } click = { click }/>
            </article>
        </section>
    )
}
export default Quizez