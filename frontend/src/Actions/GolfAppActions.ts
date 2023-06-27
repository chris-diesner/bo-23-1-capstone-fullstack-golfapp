import { GolfCourse, GolfTee } from "../models/GolfCourse";
import { Scorecard } from "../models/Scorecard";

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

export const setPlayBackNine = (playBackNine: boolean) => {
    return {
        type: "SET_PLAY_BACK_NINE",
        payload: playBackNine,
    };
};
