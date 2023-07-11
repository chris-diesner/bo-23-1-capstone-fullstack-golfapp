import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {Score} from "../../models/Scorecard";
import {useSelector, useDispatch} from "react-redux";
import {setScorecard} from "../../Actions/GolfAppActions";
import MapContainer from "./MapContainer";
import {useNavigate} from "react-router-dom";
import '../../styles/App.css'
import ScorecardHook from "../hooks/ScorecardHook";

type Props = {
    score: Score;
    holeNumber: number;
    onNextHole: () => void;
    onPrevHole: () => void;
    hasNextHole: boolean;
    hasPrevHole: boolean;
    isLastHole: boolean;
};

function HoleCard(props: Props) {
    const {score, holeNumber, onNextHole, onPrevHole, hasNextHole, hasPrevHole, isLastHole} = props;
    const [holeScore, setHoleScore] = useState<Score>({...score});
    const golfCourse = useSelector((state: any) => state.golfApp.selectedGolfCourse)
    const selectedTee = useSelector((state: any) => state.golfApp.golfTee);
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const courseCoordinates = useSelector((state: any) => state.golfApp.courseCoordinates);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { deleteScorecard } = ScorecardHook();

    useEffect(() => {
        setHoleScore({...score});
    }, [score]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = event.target;
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

    function onNextHoleAndSave() {
        handleSave()
        onNextHole()
    }

    function handleSaveAndScoreCard() {
        handleSave()
        navigate("/golfapp/finalscorecard");
    }

    function handlerOnClickAbortRound(scorecardID: string) {
        deleteScorecard(scorecardID).then(() =>
            navigate("/golfapp/")
        );
    }

    return (
        <div className="HoleContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="AppContent">
                    <div className="MapContainer" style={{position: "relative"}}>
                        {courseCoordinates && (
                            <MapContainer showClubMap={false} golfClubs={[]} holeNumber={holeNumber}/>
                        )}
                        <div className="HoleHeader" style={{position: "absolute", top: 0}}>
                            <div className="CourseInfo">
                                <span>Hole {holeNumber}</span>
                            </div>
                            <div className="CourseInfo">
                                {selectedTee?.[`length${holeNumber}`]} {golfCourse.measure}
                            </div>
                            <div className="CourseInfo">
                                Par:{" "}
                                {par}
                            </div>
                            <div className="CourseInfo">
                                C-HCP: {golfCourse.indexesMen[props.holeNumber - 1]}
                            </div>
                            <div className="CourseInfo">
                                HCP Par: {holeScore?.personalPar + par}
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="HoleForm">
                        <div className="ScorecardHeader">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="bi bi-x-circle" viewBox="0 0 16 16"
                                 onClick={() => handlerOnClickAbortRound(scorecard.scorecardId)}>
                                <path
                                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            <h6>Scorecard</h6>
                            <div></div>
                        </div>
                        <br/>
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
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" onClick={onPrevHole} disabled={!hasPrevHole}>
                                Previous Hole
                            </Button>
                            {isLastHole ? (
                                <Button variant="primary" onClick={handleSaveAndScoreCard}>
                                    Save Scorecard
                                </Button>
                            ) : (
                                <Button variant="primary" onClick={onNextHoleAndSave} disabled={!hasNextHole}>
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

export default HoleCard;
