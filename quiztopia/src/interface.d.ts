interface DataResponseCreateAccount{
    success: boolean
}
interface DataResponseLoggedIn{
    succes:string
    token?: string
    messsage?:string
}
interface ResponseCreateQuiz{
    succes: boolean
    message?: string
    quizId?: string
}
interface ResponseGetQuizes{
    quizzes: QuizesResponse[]
    succes: boolean
}
interface QuizesResponse{
    questions:QuizResponseQuestions[]
    quizId: string
    userId: string
    username: string
}
interface QuizResponseQuestions{
    answer: string
    location: {
        latitude: number
        longituder: number
    }
    question: string
}
type  SaveResponseQuizes =  React.Dispatch<React.SetStateAction<QuizesResponse[]>>

interface PositionGeolocation{
    latitude: number
    longitude: number
}