
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
    let quizId = data.quizId

    localStorage.setItem('quizId',(quizId))
   
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

const AddQuestionOnQuiz = async(quizQuestion, quizAnswear)=>{

    const quizId = localStorage.getItem('quizId')
    const longitude = localStorage.getItem('longitude')
    const latitude = localStorage.getItem('latitude')
    console.log(typeof(latitude))
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
         Authorization: `Bearer ${token}` },
         body: JSON.stringify(InfoBody)
    }
    const response = await fetch(url, setings )
    const data = await response.json()
    console.log(data)


}

const SpeificQuizFromUser = ()=>{

}

export { createQuiz, getQuizes, AddQuestionOnQuiz, SpeificQuizFromUser }

