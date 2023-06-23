import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { Score } from "../../models/Scorecard";
import { useSelector } from "react-redux";
import {GolfTee} from "../../models/GolfCourse";

type Props = {
    score: Score
};

function HoleCard(props: Props) {
    const { score } = props;
    const [holeScore, setHoleScore] = useState<Score>(score);
    const selectedTee = useSelector((state: any) => state.golfApp.golfTee)
    const scorecard = useSelector((state: any) => state.golfApp.scorecard)

    // Finde das GolfTee-Objekt basierend auf der holeNumber
    const holeNumber = holeScore?.holeNumber || 0;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setHoleScore((prevScore) => ({
            ...prevScore,
            [name]: inputValue
        }));
    };

    const handleSave = () => {
        // Führe hier die gewünschte Aktion zum Speichern der Score-Daten aus
    };

    return (
        <div className="HoleContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="GolfSelectPlayerContent">
                    <div className="HoleHeader">
                        <h6>Hole {holeNumber}</h6>
                    </div>
                    <br />
                    <div className="HoleForm">
                        <div className="form-group">
                            <label htmlFor={`totalStrokes_${holeNumber}`}>Total Strokes:</label>
                            <input
                                type="number"
                                className="form-control"
                                id={`totalStrokes_${holeNumber}`}
                                name="totalStrokes"
                                value={holeScore?.totalStrokes || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`totalPutts_${holeNumber}`}>Total Putts:</label>
                            <input
                                type="number"
                                className="form-control"
                                id={`totalPutts_${holeNumber}`}
                                name="totalPutts"
                                value={holeScore?.totalPutts || ""}
                                onChange={handleInputChange}
                            />
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
