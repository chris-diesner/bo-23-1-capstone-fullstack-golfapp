import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Scorecard } from '../../models/Scorecard';
import useScorecardHook from '../hooks/ScorecardHook';
import { useDispatch, useSelector } from 'react-redux';
import { setGolfCourse, setScorecard } from '../../Actions/GolfAppActions';
import axios from 'axios';
import '../../styles/App.css';

type Props = {
    logout: () => Promise<void>;
};

function UserScorecards(props: Props) {
    const userDetails = useSelector((state: any) => state.golfApp.userDetails);
    const navigate = useNavigate();
    const [scorecards, setScorecards] = useState<Scorecard[]>([]);
    const { loading, error, getScorecardsByUserId } = useScorecardHook();
    const dispatch = useDispatch();
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);

    const fetchGolfCourse = async () => {
        axios
            .get('/api/golfapp/course/' + scorecard.golfCourseId)
            .then((response) => {
                dispatch(setGolfCourse(response.data));
            })
            .catch((error) => console.error('Error fetching golf course', error));
    };

    useEffect(() => {
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
    }, [userDetails?.id]);

    const handleOnClickScorecard = async (scorecard: Scorecard) => {
        try {
            dispatch(setScorecard(scorecard));
            await fetchGolfCourse();
            navigate(`/golfapp/round/${scorecard.scorecardId}`);
        } catch (error) {
            console.error('Fehler beim Ausführen von handleOnClickScorecard:', error);
        }
    };

    const onClickLogout = () => {
        props.logout()
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="AppContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="AppContent">
                    <div className="AppHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => window.history.back()}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <h6>Your Rounds</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </div>
                    <br />
                    <div className="AppList">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            scorecards.map((scorecard) => (
                                <div key={scorecard.scorecardId} className="AppBody" onClick={() => handleOnClickScorecard(scorecard)}>
                                    <div className="AppHeader">
                                        <div>{scorecard.golfClubName}</div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                 fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                <path
                                                    d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="AppSubHeader">
                                        <div className="AppSubHeaderLeft">
                                            Course: {scorecard.golfCourseName}
                                        </div>
                                        <div className="AppSubHeaderRight">
                                            Date: {scorecard.date}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="AppSpacer"></div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default UserScorecards;