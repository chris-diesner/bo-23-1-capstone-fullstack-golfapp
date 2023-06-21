import React from 'react';
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {GolfTee} from "../../models/GolfCourse";
import '../../styles/GolfCourseSelectTee.css'

type Props = {
    logout: () => Promise<void>
}

function GolfCourseSelectTee(props:Props) {
    const golfCourse = useSelector((state:any) => state.golfApp.selectedGolfCourse);
    const navigate = useNavigate();

    function onClickLogout() {
        props.logout().then(() => {
            navigate('/login');
        });
    }

    return (
        <div className="GolfTeeContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="GolfTeeContent">
                    <div className="GolfTeeHeader">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-x-circle" viewBox="0 0 16 16" onClick={() => window.history.back()}>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        <h6>{golfCourse.courseName}</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path fill-rule="evenodd"
                                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fill-rule="evenodd"
                                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </div>
                    <br/>
                    <div className="GolfTeeList">
                        {golfCourse.tees && golfCourse.tees.map((tee: GolfTee) => (
                            <div key={tee.teeID} className="GolfCourseBody">
                                <div className="GolfTeeHeader">
                                    <div>{tee.teeName}</div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                             fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                            <path
                                                d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="GolfTeeSubHeader">
                                    <div className="GolfTeeSubHeaderLeft">
                                        {tee.courseRatingMen !== null || tee.courseRatingWomen !== null ? (
                                            tee.courseRatingMen || tee.courseRatingWomen
                                        ) : (
                                            "N/A"
                                        )} /
                                        {tee.slopeMen !== null || tee.slopeWomen !== null ? (
                                            tee.slopeMen || tee.slopeWomen
                                        ) : (
                                            "N/A"
                                        )}
                                    </div>
                                    <div className="GolfTeeSubHeaderRight">
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="GolfTeeSpacer">
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default GolfCourseSelectTee;