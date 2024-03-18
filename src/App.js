import React, { useReducer } from 'react';

import Header from './components/Header';
import Main from './Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextBtn from './components/NextBtn';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';

const MAX_POINTS = 150; 

const initialState = {
    questions: [],
    status: 'start',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
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

export default function App() {
    const [{ questions, status, index, answer, points, highscore }, dispatch] =
        useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const totalPoints = MAX_POINTS;

    return (
        <div>
            <div className='app'>
                <Header />
                <Main>
                    {status === 'loading' && <Loader />}
                    {status === 'start' && <StartScreen dispatch={dispatch} />}
                    {status === 'ready' && (
                        <>
                            <Progress
                                index={index}
                                numQuestions={numQuestions}
                                points={points}
                                maxPoints={totalPoints}
                                answer={answer}
                            ></Progress>
                            <Question
                                question={questions[index]}
                                dispatch={dispatch}
                                answer={answer}
                            />
                            <Footer>
                                <NextBtn
                                    dispatch={dispatch}
                                    answer={answer}
                                    index={index}
                                    numQuestions={numQuestions}
                                />
                            </Footer>
                        </>
                    )}
                    {status === 'finished' && (
                        <FinishScreen
                            dispatch={dispatch}
                            points={points}
                            totalPoints={totalPoints}
                            highscore={highscore}
                        />
                    )}
                </Main>
            </div>
        </div>
    );
}
