export interface DataResponseCreateAccount{
    success: boolean
}
export interface DataResponseLoggedIn{
    succes:string
    token?: string
    messsage?:string
}
export interface ResponseCreateQuiz{
    succes: boolean
    message?: string
    quizId?: string 
}
interface ResponseGetQuizes{
    quizzes: QuizesResponse[]
    succes: boolean
}
export interface QuizesResponse{
    questions:QuizResponseQuestions[]
    quizId: string
    userId: string
    username: string
}
export interface QuizResponseQuestions{
    answer: string
    location: {
        latitude: number
        longitude: number
    }
    question: string
}
export type  SaveResponseQuizes =  React.Dispatch<React.SetStateAction<QuizesResponse[]>>

export interface PositionGeolocation{
    latitude: number
    longitude: number
}
export interface QuestionsResponse{
    quiz: QuestionsResponseQuiz
}
export interface QuestionsResponseQuiz{
    Attributes: QuestionsResponseAttributes
}
interface QuestionsResponseAttributes{
    questions:QuestionsResponseAttributesQuestions[]
    quizId: string
    userId:string
    username: string
}
export interface QuestionsResponseAttributesQuestions{
    answear: string
    location: QuestionsResponseLocation
    question:string
}
export interface QuestionsResponseLocation{
    latitude: string
    longitude: string
}
export interface PropsUserQuiz{
    quiz: QuizesResponse
}
export interface PropsSetlingSetlat{
    setlngToQuestion: React.Dispatch<React.SetStateAction<number>>
    setlatToQuestion:  React.Dispatch<React.SetStateAction<number>>
    click: number
}
export interface PropsQuiz{
    quiz: QuizesResponse;
    showQuestions: (questions: QuizResponseQuestions[])=> void;
}
export type SetMessageQuizErrors = React.Dispatch<React.SetStateAction<string>>

export type SetUserQuiz =  React.Dispatch<React.SetStateAction<QuizesResponse[] | []>>