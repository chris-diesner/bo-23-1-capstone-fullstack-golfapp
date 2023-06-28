import React from 'react';
import useScorecardHook from "../hooks/ScorecardHook";
import { useNavigate } from "react-router-dom";
import TableFrontNine from "./TableFrontNine";
import TableBackNine from "./TableBackNine";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

type Props = {
    logout: () => Promise<void>;
};

function ScorecardById(props: Props) {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const { deleteScorecard } = useScorecardHook();
    const navigate = useNavigate();

    const renderScorecard = () => {
        if (scorecard?.playBackNine) {
            return (
                <>
                    <TableFrontNine />
                    <TableBackNine />
                </>
            );
        } else {
            return <TableFrontNine />;
        }
    };

    function handleDeleteScorecard() {
        deleteScorecard(scorecard?.scorecardId)
            .then(() => {
                console.log("Scorecard deleted");
                navigate("/golfapp/");
            })
            .catch((error) => console.error("Error deleting scorecard", error));
    }

    return (
        <div className="EvaluationContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="EvaluationContent">
                    <div className="EvaluationHeader">
                        <h6>Evaluation</h6>
                    </div>
                    <br />
                    <div className="EvaluationList">{renderScorecard()}</div>
                </div>
                <div className="EvaluationButtons">
                    <Button variant="danger" onClick={handleDeleteScorecard}>
                        Delete Scorecard
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default ScorecardById;
