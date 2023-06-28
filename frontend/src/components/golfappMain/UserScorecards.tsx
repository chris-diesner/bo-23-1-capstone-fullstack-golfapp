import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";
import {Scorecard} from "../../models/Scorecard";
import useScorecardHook from "../hooks/ScorecardHook";
import UserHook from "../hooks/UserHook";

type Props = {
    logout: () => Promise<void>
}
function UserScorecards(props:Props) {
    const {userDetails, getUserDetails, user} = UserHook();
    const navigate = useNavigate();
    const[scorecards, setScorecards] = useState<Scorecard[]>([])
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

    function onClickLogout() {
        props.logout()
            .then(() => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="UserScorecardContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="UserScorecardContent">
                    <div className="UserScorecardHeader">
                        {/* ... Rest des Codes ... */}
                    </div>
                    <br />
                    <div className="UserScorecardList">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            scorecards.map((scorecard) => (
                                <div key={scorecard.scorecardId} className="UserScorecardBody">
                                    <div className="GolfClubHeader">
                                        <div>{scorecard.golfClubName}</div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                 fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                <path
                                                    d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="UserScorecardSpacer"></div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default UserScorecards;