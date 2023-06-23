import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import HoleCard from "./HoleCard";
import {Score} from "../../models/Scorecard";

type Props = {
    logout: () => Promise<void>
}
function Scorecard(props:Props) {
    const golfCourse = useSelector((state:any) => state.golfApp.selectedGolfCourse)
    const scorecard = useSelector((state:any) => state.golfApp.scorecard)
    const [currentHoleIndex, setCurrentHoleIndex] = useState(0)

    const handleNextHole = () => {
        setCurrentHoleIndex((prevHoleIndex) => prevHoleIndex + 1)
    }
    const handlePrevHole = () => {
        setCurrentHoleIndex((prevHoleIndex) => prevHoleIndex - 1)
    }

    const handleSaveScore = (holeNumber: number, newScore: Score) => {
        // Aktualisieren Sie den Score der Scorecard im Redux Store
        // Implementieren Sie entsprechende Logik, um den Score zu speichern
    };



    return (
        <div className="ScorecardContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="GolfSelectPlayerContent">
                    <div className="ScorecardHeader">
                        <h6>Scorecard</h6>
                    </div>
                    <br />
                    <div className="HoleList">
                        <HoleCard score={scorecard.scores[currentHoleIndex]}  />

                        <div className="d-flex justify-content-between">
                            <Button variant="primary" >
                                Previous Hole
                            </Button>
                            <Button variant="primary" >
                                Next Hole
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Scorecard;