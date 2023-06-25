import React from 'react';
import {useSelector} from "react-redux";
import useScorecardHook from "./hooks/ScorecardHook";
import {Container, Table} from "react-bootstrap";

type Props = {
    logout: () => Promise<void>
}

function EvaluationRound(props: Props) {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const golfCourse = useSelector((state: any) => state.golfApp.selectedGolfCourse);
    const {editScorecard} = useScorecardHook();

    return (
        <div className="EvaluationContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="EvaluationContent">
                    <div className="EvaluationHeader">
                        <h6>Evaluation</h6>
                    </div>
                    <br/>
                    <div className="EvaluationList">
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                {Array.from({length: 10}).map((_, index) => (
                                    <th key={index}>Table heading</th>
                                ))}
                                <th>Out</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td></td>
                                {Array.from({length: 10}).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                <td></td>
                                {Array.from({length: 10}).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                <td></td>
                                {Array.from({length: 10}).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Par</td>
                                {Array.from({length: 10}).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Putts:</td>
                                {Array.from({length: 10}).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>Fairways:</td>
                                {Array.from({length: 10}).map((_, index) => (
                                    <td key={index}>Table cell {index}</td>
                                ))}
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default EvaluationRound;