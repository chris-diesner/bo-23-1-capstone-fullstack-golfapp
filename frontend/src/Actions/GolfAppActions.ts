import {GolfCourse} from "../models/GolfCourse";
import {Scorecard} from "../models/Scorecard";

export const setCourses = (courses: GolfCourse[]) => {
    return {
        type: 'SET_COURSES',
        payload: courses,
    };
};
export const setGolfCourse = (golfCourse: GolfCourse) => {
    return {
        type: 'SET_GOLF_COURSE',
        payload: golfCourse,
    };
};
export const setScorecard = (scorecard: Scorecard) => {
    return {
        type: 'SET_SCORECARD',
        payload: scorecard,
    };
};