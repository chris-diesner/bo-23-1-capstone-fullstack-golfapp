import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { Score } from "./Scorecard";

type Props = {
    hole: any;
    score: Score | null;
    onSaveScore: (holeNumber: number, newScore: Score) => void;
};

function HoleCard(props: Props) {
    const { hole, score, onSaveScore } = props;
    const [holeScore, setHoleScore] = useState<Score | null>(score);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setHoleScore((prevScore) => ({
            ...prevScore,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSaveScore(hole.holeNumber, holeScore!); // Annahme: holeScore ist nicht null
    };

    return (
        <div className="HoleContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="GolfSelectPlayerContent">
                    <div className="HoleHeader">
                        <h6>Hole {hole.holeNumber}</h6>
                    </div>
                    <br />
                    <div className="HoleForm">
                        <div className="form-group">
                            <label htmlFor={`totalStrokes_${hole.holeNumber}`}>Total Strokes:</label>
                            <input
                                type="number"
                                className="form-control"
                                id={`totalStrokes_${hole.holeNumber}`}
                                name="totalStrokes"
                                value={holeScore?.totalStrokes || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`totalPutts_${hole.holeNumber}`}>Total Putts:</label>
                            <input
                                type="number"
                                className="form-control"
                                id={`totalPutts_${hole.holeNumber}`}
                                name="totalPutts"
                                value={holeScore?.totalPutts || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`fairwayHit_${hole.holeNumber}`}
                                name="fairwayHit"
                                checked={holeScore?.fairwayHit || false}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor={`fairwayHit_${hole.holeNumber}`}>
                                Fairway Hit
                            </label>
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
