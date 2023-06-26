import { combineReducers } from 'redux';
import golfAppReducer from "./GolfAppReducer";
import AuthReducer from "./AuthReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    golfApp: golfAppReducer,
});

export default rootReducer;
