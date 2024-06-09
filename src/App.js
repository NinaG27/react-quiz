import Header from './components/Header';
import Main from './Main';
import Loader from './components/Loader';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextBtn from './components/NextBtn';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import { useQuiz } from './context/QuizContext';

export default function App() {
    const { status } = useQuiz();

    return (
        <div>
            <div className='app'>
                <Header />
                <Main>
                    {status === 'loading' && <Loader />}
                    {status === 'start' && <StartScreen />}
                    {status === 'ready' && (
                        <>
                            <Progress />
                            <Question />
                            <Footer>
                                <NextBtn />
                            </Footer>
                        </>
                    )}
                    {status === 'finished' && <FinishScreen />}
                </Main>
            </div>
        </div>
    );
}
