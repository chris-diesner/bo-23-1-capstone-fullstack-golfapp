import React from 'react';
import {useSelector} from "react-redux";
import {Table} from "react-bootstrap";
import {Score} from "../../models/Scorecard";

type Props = {

}

function TableBackNine(props:Props) {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard)
    const golfCourse = useSelector((state: any) => state.golfApp.selectedGolfCourse)
    return (
        <Table responsive="sm">
            <thead>
            <tr>
                <th>#</th>
                {scorecard?.scores.slice(10, 18).map((score: Score, index: number) => (
                    <th key={index}>{score.holeNumber}</th>
                ))}
                <th>Out</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                {scorecard?.scores.slice(10, 18).map((score: Score, index: number) => (
                    <td key={index}>{score.totalStrokes}</td>
                ))}
                <td>Total</td>
            </tr>
            <tr>
                <td></td>
                {scorecard?.scores.slice(10, 18).map((score: Score, index: number) => {
                    const totalStrokes = score.totalStrokes;
                    const par = golfCourse?.parsMen[index];
                    const diff = totalStrokes - par;
                    const cumulativeDiff = scorecard?.scores
                        .slice(0, index + 1)
                        .reduce((sum:number, currScore:any) => sum + (currScore.totalStrokes - golfCourse?.parsMen[currScore.holeNumber - 1]), 0);
                    return (
                        <td key={index}>
                            {diff}
                        </td>

                    );
                })}
                <td>Total: </td>
            </tr>
            <tr>
                <td>Par</td>
                {golfCourse?.parsMen.slice(10, 18).map((par: number, index: number) => (
                    <td key={index}>{par}</td>
                ))}
            </tr>
            <tr>
                <td></td>
                {scorecard?.scores.slice(10, 18).map((score: Score, index: number) => (
                    <td key={index}>{score.totalPutts}</td>
                ))}
            </tr>
            <tr>
                <td></td>
                {scorecard?.scores.slice(10, 18).map((score: Score, index: number) => (
                    <td key={index}>{score.fairwayHit ? 'Yes' : 'No'}</td>
                ))}
            </tr>
            <tr>
                <td>Putts:</td>
                {Array.from({ length: scorecard?.scores.length }).map((_, index) => (
                    <td key={index}>{/* Calculate putts */}</td>
                ))}
            </tr>
            <tr>
                <td>Fairways:</td>
                {Array.from({ length: scorecard?.scores.length }).map((_, index) => (
                    <td key={index}>{/* Calculate fairways */}</td>
                ))}
            </tr>
            </tbody>
        </Table>
    );
}

export default TableBackNine;