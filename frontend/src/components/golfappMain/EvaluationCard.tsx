import React from 'react';
import {useSelector} from "react-redux";
import useScorecardHook from "../hooks/ScorecardHook";
import {Button, Container} from "react-bootstrap";
import TableFrontNine from "./TableFrontNine";
import TableBackNine from "./TableBackNine";
import {useNavigate} from "react-router-dom";

type Props = {
    logout: () => Promise<void>
}

function EvaluationCard(props: Props) {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const {editScorecard} = useScorecardHook();
    const navigate = useNavigate()

    const renderScorecard = () => {
        if (scorecard?.playBackNine) {
            return (
                <>
                    <TableFrontNine/>
                    <TableBackNine/>
                </>
            )
        } else {
            return (
                <TableFrontNine/>
            )
        }
    }

    function handleSaveScorecard() {
        editScorecard(scorecard)
            .then(() => {
                console.log("Scorecard saved");
                navigate("/golfapp");
            })
            .catch((error) => console.error("Error saving scorecard", error));
    }

    return (
        <div className="EvaluationContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="EvaluationContent">
                    <div className="EvaluationHeader">
                        <h6>Evaluation</h6>
                    </div>
                    <br />
                    <div className="EvaluationList">
                        {renderScorecard()}
                    </div>
                </div>
                <div className="EvaluationButtons">
                    <Button variant="primary" onClick={handleSaveScorecard}>
                        Save Scorecard
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default EvaluationCard;