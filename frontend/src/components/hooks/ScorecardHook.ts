import { useState } from 'react';
import axios from 'axios';
import {Scorecard} from "../../models/Scorecard";

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

    const editScorecard = async (scorecard: Scorecard) => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.put('/api/golfapp/scorecard/' + scorecard.scorecardId, scorecard);
            const editedScorecard = response.data;
            console.log('Scorecard edited successfully.');
            return editedScorecard;
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getScorecardsByUserId = async (userId: string) => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('/api/golfapp/scorecard/user/' + userId);
            const scorecards = response.data;
            console.log('Scorecards fetched successfully.');
            return scorecards;
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {loading, error, saveScorecard, editScorecard, getScorecardsByUserId}
}
export default useScorecardHook;
