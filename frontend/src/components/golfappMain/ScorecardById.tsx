import React from 'react';
import useScorecardHook from "../hooks/ScorecardHook";
import { useNavigate } from "react-router-dom";
import TableFrontNine from "./TableFrontNine";
import TableBackNine from "./TableBackNine";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import '../../styles/EvaluationCard.css'

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
        <div className="EvaluationContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="EvaluationContent">
                    <div className="EvaluationHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => navigate("/golfapp")}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <h6>{scorecard.golfCourseName}, {scorecard.date}, Spielvorgabe: {scorecard.courseHandicap}</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
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
