import { GolfCourse } from "../models/GolfCourse";

const initialState: GolfCourse[] = [];

const selectedCoursesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_COURSES':
            return action.payload;
        default:
            return state;
    }
};

export default selectedCoursesReducer;
