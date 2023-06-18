import {GolfCourse} from "../models/GolfCourse";

const initialState: GolfCourse[] | null = null;

const golfClubReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_COURSES':
            return action.payload;
        default:
            return state;
    }
};

export default golfClubReducer;
