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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const saveScorecard = async (scorecardDTO: ScorecardDTO) => {
        try {
            setLoading(true);
            setError('');
            await axios.post('/api/golfapp/scorecard', scorecardDTO);
            console.log('Scorecard saved successfully.');
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };
    return { loading, error, saveScorecard };
};

export default useScorecardHook;
