import { useMemo } from "react";
import { shuffle, decodeHtml } from "../utils/utils"

function Option({ question, dispatch, answer }) {

      const options = useMemo(() => {
        return shuffle([...question.incorrect_answers, question.correct_answer])
    }, [question.correct_answer, question.incorrect_answers])

    return (
        <div className='options'>
            {options.map((option) => {
                const isCorrect = option === question.correct_answer;
                const isSelected = option === answer
                const isDisabled = answer !== null;

                return (
                    <button
                        onClick={() =>
                            dispatch({ type: 'newAnswer', payload: option})
                        }
                        className={`btn btn-option ${
                            isSelected ? 'answer' : ""
                        } ${
                            !isDisabled ? '' : isCorrect ? 'correct' : 'wrongAns'
                        }`}
                        key={option}
                        disabled={isDisabled}
                    >
                        {decodeHtml(option)}
                    </button>
                );
            })}
        </div>
    );
}

export default Option;
