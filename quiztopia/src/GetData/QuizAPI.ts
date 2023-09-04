
import { ResponseCreateQuiz, SaveResponseQuizes, ResponseGetQuizes, QuestionsResponse } from "../interface"

const createQuiz = async(quizName:string)=>{

    const token: string = JSON.parse(localStorage.getItem('token') || '')
    console.log(token)
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'

    const setings = {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body:JSON.stringify({ name:quizName}),
    }
    const response = await fetch(url, setings )
    const data:ResponseCreateQuiz = await response.json()
    console.log(data)
    
    if(data.succes === false){
        console.log('nu är quizId undefined')
    }if(data.succes === true) {
    localStorage.setItem('quizId',(data.quizId)) 
   }
    if(data.succes === false){
        console.log('du måste logga in igen, din session har gått ut')
    }
}

const getQuizes =  async( setGetQuiz: SaveResponseQuizes )=>{

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
}

const AddQuestionOnQuiz = async(quizQuestion:string, quizAnswear: string , lon:number, lat:number)=>{

    const longitude = lon.toString()
    const latitude = lat.toString()
    console.log(lat, lon, 'api')
    const quizId = localStorage.getItem('quizId')
    console.log(quizId)
    const token: string = JSON.parse(localStorage.getItem('token') || '')
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question' 

    const InfoBody = {
        name: quizId,
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
    console.log(data)
    console.log(data.quiz.Attributes.userId)
    localStorage.setItem('user',(data.quiz.Attributes.userId)) 
}

const SpeificQuizFromUser = async( setspecificQuiz: QuestionsResponse )=>{

    const token: string = JSON.parse(localStorage.getItem('token') || '')
    const quizId = localStorage.getItem('quizId')
    const userId = localStorage.getItem('user')
    console.log( 'quizId', quizId, 'userID',userId)

    const url  = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${userId}/${quizId}`
    const setings = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`},
    }

    const response = await fetch(url, setings)
    const data = await response.json()
    console.log(data)
    if(data.quiz){
        setspecificQuiz(data.quiz)
    }

}

export { createQuiz, getQuizes, AddQuestionOnQuiz, SpeificQuizFromUser }

