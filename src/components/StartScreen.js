import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

import { difficulties, categories } from '../data/data';

function StartScreen({ dispatch }) {
    const [difficulty, setDifficulty] = useState('easy');
    const [category, setCategory] = useState(8);
    const [fetchData, setFetchData] = useState(false);

    function mapCategory(value) {
        const key = Object.keys(categories).find(
            key => categories[key].toLocaleLowerCase() === value
        );
        setCategory(key);
    }

   useEffect(() => {
        const fetchDataFromAPI = async () => {
            const API_URL = `https://opentdb.com/api.php?amount=15&category=${
                category === 8 ? '' : category
            }&difficulty=${difficulty}&type=multiple`;

            try {
                dispatch({ type: 'loading' });
                const response = await fetch(API_URL);
                const data = await response.json();
                dispatch({ type: 'dataReceived', payload: data });
            } catch (err) {
                console.error('Failed to fetch data', err);
                dispatch({ type: 'dataError' });
            }
        };
        if (fetchData) {
            fetchDataFromAPI();
        }
    }, [fetchData, dispatch, difficulty, category]);

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
            <button className='btn btn-ui' onClick={() => setFetchData(true)}>
                Let's start
            </button>
        </div>
    );
}

export default StartScreen;
