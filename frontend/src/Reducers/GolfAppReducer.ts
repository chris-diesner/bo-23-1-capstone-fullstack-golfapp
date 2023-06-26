import { GolfCourse, GolfTee } from "../models/GolfCourse";
import { Scorecard } from "../models/Scorecard";

interface AppState {
    courses: GolfCourse[];
    selectedGolfCourse: GolfCourse | null;
    scorecard: Scorecard | null;
    golfTee: GolfTee | null;
    playFrontNine: boolean;
    playBackNine: boolean;
}

const initialState: AppState = {
    courses: [],
    selectedGolfCourse: null,
    scorecard: null,
    golfTee: null,
    playFrontNine: false,
    playBackNine: false,
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
        case "SET_PLAY_FRONT_NINE":
            return {
                ...state,
                playFrontNine: action.payload,
            };
        case "SET_PLAY_BACK_NINE":
            return {
                ...state,
                playBackNine: action.payload,
            };
        default:
            return state;
    }
};

export default golfAppReducer;
