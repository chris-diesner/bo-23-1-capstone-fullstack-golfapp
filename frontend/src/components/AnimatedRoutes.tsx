import React from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "./Home";
import ProtectedRoutes from "./ProtectedRoutes";
import UserMainPage from "./golfappMain/UserMainPage";
import UserDetails from "./golfappMain/UserDetails";
import GolfClubFind from "./golfappMain/GolfClubFind";
import GolfCourseSelect from "./golfappMain/GolfCourseSelect";
import GolfCourseSelectTee from "./golfappMain/GolfCourseSelectTee";
import GolfCourseSelectPlayer from "./golfappMain/GolfCourseSelectPlayer";
import Scorecard from "./golfappMain/Scorecard";
import EvaluationCard from "./golfappMain/EvaluationCard";
import UserScorecards from "./golfappMain/UserScorecards";
import ScorecardById from "./golfappMain/ScorecardById";
import UserStatistics from "./golfappMain/UserStatistics";
import Register from "./Register";
import Login from "./Login";
import UserHook from "./hooks/UserHook";
import {AnimatePresence} from "framer-motion"

function AnimatedRoutes() {
    const {login, logout, register, editUserDetails, user} = UserHook()
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path={"/"} element={<Home/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/golfapp"} element={<UserMainPage logout={logout}/>}/>
                    <Route path={"/golfapp/userdetails"}
                           element={<UserDetails logout={logout} editUserDetails={editUserDetails}/>}/>
                    <Route path={"/golfapp/clubs"} element={<GolfClubFind logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses"} element={<GolfCourseSelect logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses/tees"} element={<GolfCourseSelectTee logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses/tees/round"}
                           element={<GolfCourseSelectPlayer logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses/tees/round/scorecard"} element={<Scorecard/>}/>
                    <Route path={"/golfapp/finalscorecard"} element={<EvaluationCard logout={logout}/>}/>
                    <Route path={"/golfapp/rounds"} element={<UserScorecards logout={logout}/>}/>
                    <Route path={"/golfapp/round/:id"} element={<ScorecardById logout={logout}/>}/>
                    <Route path={"/golfapp/user/statistics"} element={<UserStatistics logout={logout}/>}/>
                </Route>
                <Route path="/register" element={<Register register={register}/>}/>
                <Route path="/login" element={<Login login={login}/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;
