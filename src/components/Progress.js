import { useQuiz } from '../context/QuizContext';

function Progress() {
    const { index, numQuestions, points, totalPoints, answer } = useQuiz();

    return (
        <header className='progress'>
            <progress
                value={index + Number(answer !== null)}
                max={numQuestions}
            />
            <p>
                Question <strong>{index + 1}</strong> / {numQuestions}{' '}
            </p>
            <p>
                Points {points} / {totalPoints}
            </p>
        </header>
    );
}

export default Progress;
