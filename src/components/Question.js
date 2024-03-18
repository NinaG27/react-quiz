import Error from "./Error";
import Option from "./Option";
import { decodeHtml } from "../utils/utils";

function Question({question, dispatch, answer}) {
    if(!question) return <Error></Error>
 
    return (
        <div>
            <h4>{decodeHtml(question.question)}</h4> 
            <Option question={question} dispatch={dispatch} answer={answer}/>
        </div>
    )
}

export default Question;
