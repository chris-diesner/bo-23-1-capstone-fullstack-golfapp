import { combineReducers } from 'redux';
import golfAppReducer from "./GolfAppReducer";

const rootReducer = combineReducers({
    golfApp: golfAppReducer,
});

export default rootReducer;