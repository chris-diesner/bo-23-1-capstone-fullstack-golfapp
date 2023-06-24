import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import HoleCard from "./HoleCard";
import useScorecardHook from "../hooks/ScorecardHook";

type Props = {
    logout: () => Promise<void>
};

function Scorecard(props: Props) {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
    const { editScorecard } = useScorecardHook();

    const handleNextHole = () => {
        setCurrentHoleIndex((prevHoleIndex) => prevHoleIndex + 1);
    };

    const handlePrevHole = () => {
        setCurrentHoleIndex((prevHoleIndex) => prevHoleIndex - 1);
    };

    const isLastHole = currentHoleIndex === 17
    const hasNextHole = currentHoleIndex < 17
    const hasPrevHole = currentHoleIndex > 0;

    function handleSaveScorecard() {
        editScorecard(scorecard)
            .then(() => {
                console.log("Scorecard saved");
            })
            .catch((error) => console.error("Error saving scorecard", error));
    }

    return (
        <div className="ScorecardContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="GolfSelectPlayerContent">
                    <div className="ScorecardHeader">
                        <h6>Scorecard</h6>
                    </div>
                    <br />
                    <div className="HoleList">
                        <HoleCard score={scorecard.scores[currentHoleIndex]} holeNumber={currentHoleIndex + 1} />

                        <div className="d-flex justify-content-between">
                            <Button variant="primary" onClick={handlePrevHole} disabled={!hasPrevHole}>
                                Previous Hole
                            </Button>
                            {isLastHole ? (
                                <Button variant="primary" onClick={handleSaveScorecard}>
                                    Save Scorecard
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
