import { GolfCourse, GolfTee } from "../models/GolfCourse";
import { Scorecard } from "../models/Scorecard";
import {CourseCoordinates} from "../models/CourseCoordinates";
import {GolfUser} from "../models/GolfUser";

export const setCourses = (courses: GolfCourse[]) => {
    return {
        type: "SET_COURSES",
        payload: courses,
    };
};

export const setGolfCourse = (golfCourse: GolfCourse) => {
    return {
        type: "SET_GOLF_COURSE",
        payload: golfCourse,
    };
};

export const setScorecard = (scorecard: Scorecard) => {
    return {
        type: "SET_SCORECARD",
        payload: scorecard,
    };
};

export const setGolfTee = (golfTee: GolfTee) => {
    return {
        type: "SET_GOLF_TEE",
        payload: golfTee,
    };
};

export const setCoordinates = (courseCoordinates: CourseCoordinates) => {
    return {
        type: "SET_COURSE_COORDINATES",
        payload: courseCoordinates
    }
}

export const setUserDetails = (userDetails: GolfUser) => {
    return {
        type: "SET_USER_DETAILS",
        payload: userDetails
    }
}
