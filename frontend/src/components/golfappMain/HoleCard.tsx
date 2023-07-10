import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { Score } from "../../models/Scorecard";
import { useSelector, useDispatch } from "react-redux";
import { setScorecard } from "../../Actions/GolfAppActions";
import MapContainer from "./MapContainer";

type Props = {
    score: Score;
    holeNumber: number;
};

function HoleCard(props: Props) {
    const { score, holeNumber } = props;
    const [holeScore, setHoleScore] = useState<Score>({ ...score });
    const golfCourse = useSelector((state: any) => state.golfApp.selectedGolfCourse)
    const selectedTee = useSelector((state: any) => state.golfApp.golfTee);
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const courseCoordinates = useSelector((state: any) => state.golfApp.courseCoordinates);
    const dispatch = useDispatch();

    useEffect(() => {
        setHoleScore({ ...score });
    }, [score]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setHoleScore((prevScore) => ({
            ...prevScore,
            [name]: inputValue,
            holeNumber: holeNumber
        }));
    };

    const calculateStableford = (score: Score, par: number) => {
        const strokes = (score.totalStrokes);
        const netScore = strokes - score.personalPar;

        if (strokes === 0) {
            return 0;
        }

        if (netScore >= par + 2) {
            return 0;
        }

        if (netScore === par + 1) {
            return 1;
        }

        if (netScore === par) {
            return 2;
        }

        if (netScore === par - 1) {
            return 3;
        }

        if (netScore === par - 2) {
            return 4;
        }

        if (netScore <= par - 3) {
            return 5;
        }

        return 0;
    };


    const handleSave = () => {
        const updatedScores = [...scorecard.scores];
        updatedScores[props.holeNumber - 1] = {
            ...holeScore,
            stablefordNet: calculateStableford(holeScore, golfCourse.parsMen[props.holeNumber - 1])
        };

        const totalStrokesRound = updatedScores.reduce((sum, score) => sum + parseInt(score.totalStrokes), 0);
        const updatedScorecard = {
            ...scorecard,
            scores: updatedScores,
            totalScore: totalStrokesRound,
        };

        dispatch(setScorecard(updatedScorecard));
    };


    const par = golfCourse.parsMen[props.holeNumber - 1];
    const stablefordNet = calculateStableford(holeScore, par);

    return (
        <div className="HoleContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="GolfSelectPlayerContent">
                    {courseCoordinates && (
                        <MapContainer showClubMap={false} golfClubs={[]} holeNumber={holeNumber} />
                    )}
                    <div className="HoleHeader">
                        <h6>
                            Hole {holeNumber}, {selectedTee?.[`length${holeNumber}`]} {golfCourse.measure}, Par:{" "}
                            {par}, HCP: {golfCourse.indexesMen[props.holeNumber - 1]},
                            Personal Par: {holeScore?.personalPar + par}
                        </h6>
                    </div>
                    <br />
                    <div className="HoleForm">
                        <div className="form-group">
                            <label htmlFor={`totalStrokes_${holeNumber}`}>Total Strokes:</label>
                            <input
                                type="range"
                                min="1"
                                max="14"
                                className="form-control"
                                id={`totalStrokes_${holeNumber}`}
                                name="totalStrokes"
                                value={holeScore?.totalStrokes || ""}
                                onChange={handleInputChange}
                            />
                            <span>{holeScore?.totalStrokes}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor={`totalPutts_${holeNumber}`}>Total Putts:</label>
                            <input
                                type="range"
                                min="1"
                                max="7"
                                className="form-control"
                                id={`totalPutts_${holeNumber}`}
                                name="totalPutts"
                                value={holeScore?.totalPutts || ""}
                                onChange={handleInputChange}
                            />
                            <span>{holeScore?.totalPutts}</span>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`fairwayHit_${holeNumber}`}
                                name="fairwayHit"
                                checked={holeScore?.fairwayHit || false}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor={`fairwayHit_${holeNumber}`}>
                                Fairway Hit
                            </label>
                        </div>
                        <div>
                            Stableford Net: {stablefordNet}
                        </div>
                        <button className="btn btn-primary" onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default HoleCard;
