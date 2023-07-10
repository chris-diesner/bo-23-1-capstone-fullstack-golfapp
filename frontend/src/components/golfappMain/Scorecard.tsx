import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import HoleCard from "./HoleCard";
import {useNavigate} from "react-router-dom";
import '../../styles/Scorecard.css'
import ScorecardHook from "../hooks/ScorecardHook";

function Scorecard() {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
    const navigate = useNavigate()
    const {deleteScorecard} = ScorecardHook()

    const handleNextHole = () => {
        setCurrentHoleIndex((prevHoleIndex) => prevHoleIndex + 1);
    };

    const handlePrevHole = () => {
        setCurrentHoleIndex((prevHoleIndex) => prevHoleIndex - 1);
    };

    const isLastHole = scorecard.playBackNine ? currentHoleIndex === 17 : currentHoleIndex === 8;
    const hasNextHole = scorecard.playBackNine ? currentHoleIndex < 17 : currentHoleIndex < 8;
    const hasPrevHole = currentHoleIndex > 0;

    function handleDisplayScorecard() {
                navigate("/golfapp/finalscorecard");
    }

    function handlerOnClickAbortRound(scorecardID: string) {
        deleteScorecard(scorecardID).then(() =>
            navigate("/golfapp/")
        )
    }

    return (
        <div className="ScorecardContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="ScorecardPlayerContent">
                    <div className="ScorecardHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => handlerOnClickAbortRound(scorecard.scorecardId)}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <h6>Scorecard</h6>
                        <div></div>
                    </div>
                    <br />
                    <div className="ScorecardList">
                        <HoleCard score={scorecard.scores[currentHoleIndex]} holeNumber={currentHoleIndex + 1} />

                        <div className="d-flex justify-content-between">
                            <Button variant="primary" onClick={handlePrevHole} disabled={!hasPrevHole}>
                                Previous Hole
                            </Button>
                            {isLastHole ? (
                                <Button variant="primary" onClick={handleDisplayScorecard}>
                                    Show Scorecard
                                </Button>
                            ) : (
                                <Button variant="primary" onClick={handleNextHole} disabled={!hasNextHole}>
                                    Next Hole
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Scorecard;
