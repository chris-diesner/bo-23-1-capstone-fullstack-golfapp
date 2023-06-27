import React from 'react';
import {Score} from "../../models/Scorecard";
import {Table} from "react-bootstrap";
import {useSelector} from "react-redux";

type Props = {

}
function TableFrontNine(props:Props) {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard)
    const golfCourse = useSelector((state: any) => state.golfApp.selectedGolfCourse)
    return (
        <Table responsive="sm">
            <thead>
            <tr>
                <th>#</th>
                {scorecard?.scores.slice(0, 9).map((score: Score, index: number) => (
                    <th key={index}>{score.holeNumber}</th>
                ))}
                <th>{scorecard?.playBackNine ? 'In' : 'Out'}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                {scorecard?.scores.slice(0, 9).map((score: Score, index: number) => (
                    <td key={index}>{score.totalStrokes}</td>
                ))}
                <td>{scorecard?.scores.slice(0, 9).reduce((sum: number, score: Score) => sum + parseInt(String(score.totalStrokes)), 0)}</td>
            </tr>
            <tr>
                <td></td>
                {scorecard?.scores.slice(0, 9).map((score: Score, index: number) => {
                    const totalStrokes = score.totalStrokes;
                    const par = golfCourse?.parsMen[index];
                    const diff = totalStrokes - par;
                    return (
                        <td key={index}>
                            {diff}
                        </td>
                    );
                })}
                <td>{(scorecard?.scores.slice(0, 9).reduce((sum: number, score: Score) => sum + parseInt(String(score.totalStrokes)), 0))
                -
                    (golfCourse?.parsMen.slice(0, 9).reduce((sum: number, par: number) => sum + par, 0))} </td>
            </tr>
            <tr>
                <td>Par</td>
                {golfCourse?.parsMen.slice(0, 9).map((par: number, index: number) => (
                    <td key={index}>{par}</td>
                ))}
                <td>{golfCourse?.parsMen.slice(0, 9).reduce((sum: number, par: number) => sum + par, 0)}</td>
            </tr>
            <tr>
                <td>Putts:</td>
                {scorecard?.scores.slice(0, 9).map((score: Score, index: number) => (
                    <td key={index}>{score.totalPutts}</td>
                ))}
                <td></td>
            </tr>
            <tr>
                <td>Fairways:</td>
                {scorecard?.scores.slice(0, 9).map((score: Score, index: number) => (
                    <td key={index}>{score.fairwayHit ? 'Yes' : 'No'}</td>
                ))}
                <td></td>
            </tr>
            </tbody>
        </Table>
    );
}

export default TableFrontNine;