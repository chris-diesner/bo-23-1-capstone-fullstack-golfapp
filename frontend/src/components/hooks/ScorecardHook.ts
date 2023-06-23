import { useState } from 'react';
import axios from 'axios';

type ScorecardDTO = {
    userId: string
    golfCourseId: string
    players: string[]
    date: string
    scores: any[]
    totalScore: number
};

const useScorecardHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const saveScorecard = async (scorecardDTO: ScorecardDTO) => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.post('/api/golfapp/scorecard', scorecardDTO);
            const createdScorecard = response.data;
            console.log('Scorecard saved successfully.');
            return createdScorecard;
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, saveScorecard };
};

export default useScorecardHook;
