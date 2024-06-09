import { useQuiz } from "../context/QuizContext";

function NextBtn() {

    const {dispatch, answer, index, numQuestions} = useQuiz();
    
    if(answer === null) return null;

    if( index < numQuestions -1 ) return (
        <button className="btn btn-ui" onClick={() => dispatch({type: 'nextAnswer'})}>
            Next
        </button>
    )

    if( index === numQuestions -1 ) return (
        <button className="btn btn-ui" onClick={() => dispatch({type: 'finished'})}>
            Finish
        </button>
    )
}

export default NextBtn
