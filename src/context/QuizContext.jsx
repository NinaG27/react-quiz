import { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const MAX_POINTS = 150;

const initialState = {
    questions: [],
    status: 'start',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    difficulty: 'easy',
    category: 8,
};

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                status: 'loading',
            };
        case 'dataReceived':
            const questions = action.payload.results;
            return {
                ...state,
                questions: questions,
                status: 'ready',
            };
        case 'dataError':
            return {
                ...state,
                status: 'error',
            };
        case 'start':
            return {
                ...state,
                status: 'start',
            };
        case 'newAnswer':
            const currQuestion = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === currQuestion.correct_answer
                        ? (state.points = state.points + 10)
                        : state.points,
            };
        case 'nextAnswer':
            return {
                ...state,
                index: (state.index += 1),
                answer: null,
            };
        case 'finished':
            return {
                ...state,
                status: 'finished',
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        case 'difficulty':
            return {
                ...state,
                difficulty: action.payload,
            };
        case 'category':
            return {
                ...state,
                category: action.payload,
            };
        case 'reset':
            return {
                ...initialState,
                questions: state.questions,
                highscore: state.highscore,
                status: 'start',
            };

        default:
            throw new Error('Action unknown');
    }
}

function QuizProvider({ children }) {
    const [{ questions, status, index, answer, points, highscore, category, difficulty }, dispatch] =
        useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const totalPoints = MAX_POINTS;

    async function fetchQuestions() {
        dispatch({ type: 'loading' });
        const API_URL = `https://opentdb.com/api.php?amount=15&category=${
            category === 8 ? '' : category
        }&difficulty=${difficulty}&type=multiple`;

        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            dispatch({ type: 'dataReceived', payload: data });
        } catch (err) {
            console.error('Failed to fetch data', err);
            dispatch({ type: 'dataError' });
        }
    }

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                points,
                highscore,
                numQuestions,
                totalPoints,
                fetchQuestions,
                dispatch,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (!context)
        throw new Error('Quiz context used outside of Quiz provider.');
    return context;
}

export { QuizProvider, useQuiz };
