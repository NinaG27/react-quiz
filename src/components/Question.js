import Error from './Error';
import Option from './Option';
import { decodeHtml } from '../utils/utils';
import { useQuiz } from '../context/QuizContext';

function Question() {
    const { index, questions, dispatch, answer } = useQuiz();

    const question = questions[index];

    if (!question) return <Error></Error>;

    return (
        <div>
            <h4>{decodeHtml(question.question)}</h4>
            <Option question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;
