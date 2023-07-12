import React, {useState} from 'react';
import {useSelector} from "react-redux";
import HoleCard from "./HoleCard";
import {useNavigate} from "react-router-dom";
import '../../styles/Scorecard.css'

function Scorecard() {
    const scorecard = useSelector((state: any) => state.golfApp.scorecard);
    const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
    const navigate = useNavigate();

    const handleNextHole = () => {
        setCurrentHoleIndex((prevHoleIndex) => prevHoleIndex + 1);
    };

    const handlePrevHole = () => {
        setCurrentHoleIndex((prevHoleIndex) => prevHoleIndex - 1);
    };

    const isLastHole = scorecard.playBackNine ? currentHoleIndex === 17 : currentHoleIndex === 8;
    const hasNextHole = scorecard.playBackNine ? currentHoleIndex < 17 : currentHoleIndex < 8;
    const hasPrevHole = currentHoleIndex > 0;

    function handleDisplayScorecard() {
        navigate("/golfapp/finalscorecard");
    }

    function handleNextHoleOrSave() {
        if (isLastHole) {
            handleDisplayScorecard();
        } else {
            handleNextHole();
        }
    }

    return (
        <div className="HoleCard">
            <HoleCard
                score={scorecard.scores[currentHoleIndex]}
                holeNumber={currentHoleIndex + 1}
                onNextHole={handleNextHoleOrSave}
                onPrevHole={handlePrevHole}
                hasNextHole={hasNextHole}
                hasPrevHole={hasPrevHole}
                isLastHole={isLastHole}
            />
        </div>
    );
}

export default Scorecard;
