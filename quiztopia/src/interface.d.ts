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
    quizId?: string | undefined
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
        longitude: number
    }
    question: string
}
type  SaveResponseQuizes =  React.Dispatch<React.SetStateAction<QuizesResponse[]>>

interface PositionGeolocation{
    latitude: number
    longitude: number
}
interface QuestionsResponse{
    quiz: QuestionsResponseQuiz
}
interface QuestionsResponseQuiz{
    Attributes: QuestionsResponseAttributes
}
interface QuestionsResponseAttributes{
    questions:QuestionsResponseAttributesQuestions[]
    quizId: string
    userId:string
    username: string
}
interface QuestionsResponseAttributesQuestions{
    answear: string
    location: QuestionsResponseLocation
    question:string
}
interface QuestionsResponseLocation{
    latitude: string
    longitude: string
}