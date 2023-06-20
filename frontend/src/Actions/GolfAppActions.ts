import {GolfCourse} from "../models/GolfCourse";

export const setCourses = (courses: GolfCourse[]) => {
    return {
        type: 'SET_COURSES',
        payload: courses,
    };
};