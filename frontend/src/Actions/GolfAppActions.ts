import {GolfCourse} from "../models/GolfCourse";

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