import Dropdown from './Dropdown';
import { difficulties, categories } from '../data/data';
import { useQuiz } from '../context/QuizContext';

function StartScreen() {
    const { dispatch, fetchQuestions } = useQuiz();

    function mapCategory(value) {
        const key = Object.keys(categories).find(
            key => categories[key].toLocaleLowerCase() === value
        );
        dispatch({ type: 'category', payload: key });
    }

    function setDifficulty(value) {
        dispatch({ type: 'difficulty', payload: value });
    }

    return (
        <div>
            <Dropdown
                title={'Pick the difficulty:'}
                arr={Object.values(difficulties)}
                action={setDifficulty}
            />
            <Dropdown
                title={'Pick the category:'}
                arr={Object.values(categories)}
                action={mapCategory}
            />
            <button className='btn btn-ui' onClick={fetchQuestions}>
                Let's start
            </button>
        </div>
    );
}

export default StartScreen;
