
import { ResponseCreateQuiz, SaveResponseQuizes, ResponseGetQuizes, QuestionsResponse,SetMessageQuizErrors, SetUserQuiz, SetStateQuestionMessage } from "../interface"

const createQuiz = async(quizName:string, setMessageQuizError: SetMessageQuizErrors  ) => {

    const token: string = JSON.parse(localStorage.getItem('token') || '')
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'

    const setings = {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body:JSON.stringify({ name:quizName}),
    }
    const response = await fetch(url, setings )
    const data:ResponseCreateQuiz = await response.json()
    console.log('Create quiz', data)

    // if(data.success === false){
    // console.log('kunde inte skapa quiz API')
    //  setMessageQuizError('Kunde inte skapa Quiz!!') 
    // }
}

const getQuizes =  async(  setGetQuiz: SaveResponseQuizes )=>{

    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
    const setings = {
        method:'GET',
        headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(url, setings )
    const data: ResponseGetQuizes = await response.json()
    console.log(data)
    
    if(data.quizzes){
        setGetQuiz(data.quizzes)
    }
    //fixa felhantering
   
}

const AddQuestionOnQuiz = async(quizName: string, quizQuestion:string, quizAnswear: string , lon:number, lat:number, setQuizQuestionMessage:SetStateQuestionMessage ) => {

    const longitude = lon.toString()
    const latitude = lat.toString()
    console.log(lat, lon, 'api')
    const token: string = JSON.parse(localStorage.getItem('token') || '')
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question' 

    const InfoBody = {
        name: quizName,
        question: quizQuestion,
        answer: quizAnswear,
        location: {
            longitude: longitude,
            latitude: latitude
            }
    }
    const setings = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`},
         body: JSON.stringify(InfoBody)
    }
    const response = await fetch(url, setings )
    const data: QuestionsResponse = await response.json()
    console.log('Adding question', InfoBody, data)
    localStorage.setItem('user',(data.quiz.Attributes.userId)) 
    
    if(data.success){  setQuizQuestionMessage( 'Fråga tillagd på quiz, du kan lägga till fler') }
    if (data.success === false ){ setQuizQuestionMessage('Kunde inte lägga till fråga')}

    let question = data.quiz.Attributes.questions.pop()
    console.log(question)
    if(question?.location.latitude === '0' ){ setQuizQuestionMessage(' OBS, Inga kordinater tillaggda till fråga!')}
}


const deleteQuiz = async( quizId: string ) => {
    console.log(quizId, 'finns det mellanslag')
    quizId = quizId.trim()
    

    const token: string = JSON.parse(localStorage.getItem('token') || '')
    const url  = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${quizId}`
    const setings = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`}
    }
    console.log('deleting quiz', url, setings,)
    const response = await fetch(url, setings)
    const data = await response.json()
    console.log(data)
}

const getQuizesAgainTest = async( setUserQuizes: SetUserQuiz ) => {

    try{ 
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
        const setings = {
            method:'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        
        const response = await fetch(url, setings )
        const data: ResponseGetQuizes = await response.json()
        console.log('Get quizzes', data);
        
        const username =  localStorage.getItem('name')
            if(data.quizzes && data.quizzes.length > 0 ){
            const userQuizes =  data.quizzes.filter((quiz) =>  quiz.username === username )
            console.log('Get quizzes filtered', userQuizes);

            setUserQuizes( userQuizes)
            } 
      }catch(error){
        console.log('inget API')
      }
}

export { createQuiz, getQuizes, AddQuestionOnQuiz, deleteQuiz, getQuizesAgainTest }

