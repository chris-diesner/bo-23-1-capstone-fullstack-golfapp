import React from 'react';
import {useSelector} from "react-redux";
import useScorecardHook from "../hooks/ScorecardHook";
import {Container, Table} from "react-bootstrap";
import {Score} from "../../models/Scorecard";
import TableFrontNine from "./TableFrontNine";
import TableBackNine from "./TableBackNine";

type Props = {
    logout: () => Promise<void>
}

function EvaluationCard(props: Props) {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const {editScorecard} = useScorecardHook();

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
            </Container>
        </div>
    );
}

export default EvaluationCard;