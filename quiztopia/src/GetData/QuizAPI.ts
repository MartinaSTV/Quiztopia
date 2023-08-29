
const createQuiz = async(quizName:string)=>{

    const token: string = JSON.parse(localStorage.getItem('token') || '')
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'

    const setings = {
        method: 'POST',
        body:JSON.stringify({ name:quizName}),
        headers: {
            'Content-Type': 'application/json'
        } 
    }

    try{
    const response = await fetch(url, setings )
    const data = await response.json()
    console.log(data)
    }catch(error){
        console.log('Error')
    }


}
export { createQuiz }

