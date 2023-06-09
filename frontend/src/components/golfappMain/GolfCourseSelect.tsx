import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GolfCourse } from "../../models/GolfCourse";
import axios from "axios";
import { Container } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import '../../styles/App.css'
import {setCoordinates, setGolfCourse} from "../../Actions/GolfAppActions";
import { motion } from "framer-motion";

type Props = {
    logout: () => Promise<void>
}

function GolfCourseSelect(props: Props) {
    const navigate = useNavigate();
    const [golfCourses, setGolfCourses] = useState<GolfCourse[]>([])
    const selectedCourses = useSelector((state: any) => state.golfApp.courses)
    const courseIDs = selectedCourses.map((course: GolfCourse) => course.courseID)
    const dispatch = useDispatch()

    const getCourseByCourseID = () => {
        Promise.all(courseIDs.map((courseID: string) => axios.get("/api/golfapp/course/" + courseID)))
            .then((responses) => {
                const golfCoursesData = responses.map((response) => response.data).flat();
                setGolfCourses(golfCoursesData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(getCourseByCourseID, [courseIDs])

    function onClickLogout() {
        props.logout()
            .then(() => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function onClickNavTee(golfCourse: GolfCourse) {
        dispatch(setGolfCourse(golfCourse));
        try {
            axios.get("/api/golfapp/coordinates/" + golfCourse.courseID)
                .then((response) => {
                    const courseCoordinates = response.data;
                    dispatch(setCoordinates(courseCoordinates));
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
        navigate("/golfapp/clubs/courses/tees");
        console.log(golfCourse);
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
                        <h6>{golfCourses.find((course) => course.clubName)?.clubName}</h6>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-box-arrow-right" viewBox="0 0 16 16" onClick={onClickLogout}>
                            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </div>
                    <br/>
                    <div className="AppList">
                        {golfCourses.map((golfCourse) => (
                            <div key={golfCourse.courseID} className="AppBody" onClick={() => onClickNavTee(golfCourse)}>
                                <div className="AppHeader">
                                    <div>{golfCourse.courseName}</div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                             fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                            <path
                                                d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="AppSubHeader">
                                    <div className="AppSubHeaderLeft">
                                        Holes: {golfCourse.numHoles}
                                    </div>
                                    <div className="AppSubHeaderRigt">
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="AppSpacer">
                        </div>
                    </div>
                </div>
            </Container>
        </motion.div>
    );
}

export default GolfCourseSelect;
