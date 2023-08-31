interface PropsQuiz{
    quiz: QuizesResponse[]
}

const Quiz= ({quiz}: PropsQuiz)=>{

    const showQuestions = () =>{

        //visa frågor på karta

    }
    
    return(
        <article>
            <h6>{quiz.quizId}</h6>
            <p>User Namn: { quiz.username}</p>
            <button onClick={ showQuestions }>Visa Frågor</button>
        </article>
    )
}
export default Quiz