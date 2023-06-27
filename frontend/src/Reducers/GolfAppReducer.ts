import { GolfCourse, GolfTee } from "../models/GolfCourse";
import { Scorecard } from "../models/Scorecard";

interface AppState {
    courses: GolfCourse[];
    selectedGolfCourse: GolfCourse | null;
    scorecard: Scorecard | null;
    golfTee: GolfTee | null;
    playBackNine: boolean;
}

const initialState: AppState = {
    courses: [],
    selectedGolfCourse: null,
    scorecard: null,
    golfTee: null,
    playBackNine: true,
};

const golfAppReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_COURSES':
            return {
                ...state,
                courses: action.payload,
            };
        case 'SET_GOLF_COURSE':
            return {
                ...state,
                selectedGolfCourse: action.payload,
            };
        case 'SET_SCORECARD':
            return {
                ...state,
                scorecard: action.payload,
            };
            case 'SET_GOLF_TEE':
                return {
                    ...state,
                    golfTee: action.payload,
                }
        default:
            return state;
    }
};

export default golfAppReducer;
