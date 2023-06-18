import { combineReducers } from 'redux';
import golfAppReducer from "./GolfAppReducer";

const rootReducer = combineReducers({
    selectedCourses: golfAppReducer,
});

export default rootReducer;
