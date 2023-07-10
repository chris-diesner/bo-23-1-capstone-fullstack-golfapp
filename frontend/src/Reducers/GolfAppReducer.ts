import { GolfCourse, GolfTee } from "../models/GolfCourse";
import { Scorecard } from "../models/Scorecard";
import {CourseCoordinates} from "../models/CourseCoordinates";
import {GolfUser} from "../models/GolfUser";

interface AppState {
    courses: GolfCourse[];
    selectedGolfCourse: GolfCourse | null;
    scorecard: Scorecard | null;
    golfTee: GolfTee | null;
    courseCoordinates: CourseCoordinates | null
    userDetails: GolfUser | null
}

const initialState: AppState = {
    courses: [],
    selectedGolfCourse: null,
    scorecard: null,
    golfTee: null,
    courseCoordinates: null,
    userDetails: null
};

const golfAppReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_COURSES":
            return {
                ...state,
                courses: action.payload,
            };
        case "SET_GOLF_COURSE":
            return {
                ...state,
                selectedGolfCourse: action.payload,
            };
        case "SET_SCORECARD":
            return {
                ...state,
                scorecard: action.payload,
            };
        case "SET_GOLF_TEE":
            return {
                ...state,
                golfTee: action.payload,
            };
        case "SET_COURSE_COORDINATES":
            return {
                ...state,
                courseCoordinates: action.payload
            }
        case "SET_USER_DETAILS":
            return {
                ...state,
                userDetails: action.payload
            }
        default:
            return state;
    }
};

export default golfAppReducer;
