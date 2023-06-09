import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import useScorecardHook from "../hooks/ScorecardHook";
import {setScorecard} from "../../Actions/GolfAppActions";
import '../../styles/App.css'
import {motion} from "framer-motion";

type Props = {
    logout: () => Promise<void>
}
function GolfCourseSelectPlayer(props:Props) {
    const userDetails = useSelector((state: any) => state.golfApp.userDetails)
    const golfCourse = useSelector((state:any) => state.golfApp.selectedGolfCourse)
    const selectedTee = useSelector((state:any) => state.golfApp.golfTee)
    const [playBackNine, setPlayBackNine] = useState<boolean>(true)
    const navigate = useNavigate()
    const [players, setPlayers] = useState<string[]>(["", "", ""])
    const { saveScorecard } = useScorecardHook()
    const dispatch = useDispatch()

    function onClickLogout() {
        props.logout().then(() => {
            navigate("/login")
        })
    }

    function onClickStartRound() {
        const selectedTeeCourseRating = selectedTee?.teeName === "White" || selectedTee?.teeName === "Yellow"
            ? selectedTee.courseRatingMen
            : selectedTee?.teeName === "Red"
                ? selectedTee.courseRatingWomen
                : 0

        const selectedTeeSlopeRating = selectedTee?.teeName === "White" || selectedTee?.teeName === "Yellow"
            ? selectedTee.slopeMen
            : selectedTee?.teeName === "Red"
                ? selectedTee.slopeWomen
                : 0
        const calculatedCoursePar = playBackNine
            ? golfCourse?.parsMen.slice(0, 18).reduce((acc:number, curr:number) => acc + curr, 0)
            : golfCourse?.parsMen.slice(0, 9).reduce((acc:number, curr:number) => acc + curr, 0);

        const calculatedCourseHandicap = Math.round(
            ((userDetails?.handicap ?? 0) * (selectedTeeSlopeRating / 113)) + (selectedTeeCourseRating - calculatedCoursePar)
        );

        const scorecardDTO = {
            userId: userDetails?.id ?? "",
            golfCourseId: golfCourse?.courseID ?? "",
            golfCourseName: golfCourse?.courseName ?? "",
            golfClubName: golfCourse?.clubName ?? "",
            players: players.filter((player) => player !== ""),
            date: new Date().toISOString(),
            scores: playBackNine
                ? Array.from({ length: 18 }, (_, index) => {
                    const holeHCP = golfCourse.indexesMen[index];
                    let personalPar = Math.floor(calculatedCourseHandicap / 18);

                    if (calculatedCourseHandicap % 18 >= holeHCP) {
                        personalPar += 1;
                    }

                    return {
                        holeNumber: index + 1,
                        totalStrokes: 0,
                        totalPutts: 0,
                        fairwayHit: false,
                        stablefordGross: 0,
                        stablefordNet: 0,
                        personalPar: personalPar,
                        holeHCP: holeHCP
                    };
                })
                : Array.from({ length: 9 }, (_, index) => {
                    const holeHCP = golfCourse.indexesMen[index];
                    let personalPar = Math.floor(calculatedCourseHandicap / 9);

                    if (calculatedCourseHandicap % 9 >= holeHCP) {
                        personalPar += 1;
                    }

                    return {
                        holeNumber: index + 1,
                        totalStrokes: 0,
                        totalPutts: 0,
                        fairwayHit: false,
                        stablefordGross: 0,
                        stablefordNet: 0,
                        personalPar: personalPar,
                        holeHCP: holeHCP
                    };
                }),
            totalScore: 0,
            playBackNine: playBackNine,
            courseRating: selectedTeeCourseRating,
            slopeRating: selectedTeeSlopeRating,
            courseHandicap: calculatedCourseHandicap,
            coursePar: calculatedCoursePar ?? 0,
            selectedTee: selectedTee?.teeName ?? ""
        };
        saveScorecard(scorecardDTO)
            .then((scorecard) => {
                dispatch(setScorecard(scorecard));
                navigate("/golfapp/clubs/courses/tees/round/scorecard");
            })
            .catch((error) => console.error("Error saving scorecard", error));
    }

    function onPlayBackNineChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPlayBackNine(e.target.checked)
    }

    function onPlayerNameChange(index: number, name: string) {
        setPlayers((prevPlayers) => {
            const updatedPlayers = [...prevPlayers]
            updatedPlayers[index] = name
            return updatedPlayers
        })
    }

    return (
        <motion.div className="AppContainer" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <Container className="d-flex flex-column justify-content-center">
                <div className="AppContent">
                    <div className="AppHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => window.history.back()}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <h6>Choose Flight Partners</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </div>
                    <br/>
                    <div className="AppList">
                        {players.map((player, index) => (
                            <div key={index} className="input-group">
                                <span className="input-group-text">Player</span>
                                <input
                                    type="text"
                                    aria-label="First name"
                                    className="form-control"
                                    value={player}
                                    onChange={(e) => onPlayerNameChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        {golfCourse?.numHoles === "9" && (
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={playBackNine}
                                    onChange={onPlayBackNineChange}
                                    id="playBackNine"
                                />
                                <label className="form-check-label" htmlFor="playBackNine">
                                    Play Back Nine
                                </label>
                            </div>
                        )}
                        <br/>
                        <p>
                        </p>
                        <Button className="btn btn-secondary" onClick={onClickStartRound}>Start Round</Button>
                    </div>
                </div>
            </Container>
        </motion.div>
    );
}

export default GolfCourseSelectPlayer;