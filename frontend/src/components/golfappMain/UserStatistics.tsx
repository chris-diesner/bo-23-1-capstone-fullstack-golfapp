import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scorecard, Score } from '../../models/Scorecard';
import useScorecardHook from '../hooks/ScorecardHook';
import { setScorecard } from '../../Actions/GolfAppActions';
import userDetails from './UserDetails';
import UserHook from '../hooks/UserHook';

type Props = {
    logout: () => Promise<void>;
};

function UserStatistics(props: Props) {
    const { userDetails, getUserDetails, user } = UserHook();
    const navigate = useNavigate();
    const [scorecards, setScorecards] = useState<Scorecard[]>([]);
    const { loading, error, getScorecardsByUserId } = useScorecardHook();

    useEffect(() => {
        getUserDetails()
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                const fetchScorecards = async () => {
                    try {
                        const scorecardsData = await getScorecardsByUserId(userDetails?.id);
                        setScorecards(scorecardsData);
                        console.log('Scorecards fetched successfully.');
                    } catch (error) {
                        console.error('Error:', error);
                    }
                };

                if (userDetails?.id) {
                    fetchScorecards();
                }
            });
    }, [userDetails?.id, user]);

    // Berechnung der Statistiken
    const calculateAveragePutts = () => {
        if (scorecards.length === 0) return 0;

        let totalPutts = 0;
        let totalHoles = 0;

        scorecards.forEach((scorecard) => {
            scorecard.scores.forEach((score: Score) => {
                totalPutts += score.totalPutts;
                totalHoles++;
            });
        });

        const averagePutts = totalPutts / totalHoles;
        return averagePutts.toFixed(2);
    };

    const calculateFairwayHitPercentage = () => {
        if (scorecards.length === 0) return 0;

        let fairwayHitCount = 0;
        let totalHoles = 0;

        scorecards.forEach((scorecard) => {
            scorecard.scores.forEach((score: Score) => {
                if (score.fairwayHit) {
                    fairwayHitCount++;
                }
                totalHoles++;
            });
        });

        const fairwayHitPercentage = (fairwayHitCount / totalHoles) * 100;
        return fairwayHitPercentage.toFixed(2);
    };

    return (
        <div>
            <h1>User Statistics</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: </p>}
            {!loading && !error && (
                <>
                    <p>Average Putts: {calculateAveragePutts()}</p>
                    <p>Fairway Hit Percentage: {calculateFairwayHitPercentage()}%</p>
                    {/* Weitere Statistiken hier anzeigen */}
                </>
            )}
        </div>
    );
}

export default UserStatistics;
