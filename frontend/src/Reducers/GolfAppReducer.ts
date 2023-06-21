import { GolfCourse } from "../models/GolfCourse";

interface AppState {
    courses: GolfCourse[];
    selectedGolfCourse: GolfCourse | null;
}

const initialState: AppState = {
    courses: [],
    selectedGolfCourse: null,
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
        default:
            return state;
    }
};

export default golfAppReducer;
