import React from 'react';
import './styles/App.css';
import {Route, Routes} from "react-router-dom";
import UserHook from "./components/hooks/UserHook";
import Home from "./components/Home";
import Register from "./components/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserMainPage from "./components/golfappMain/UserMainPage";
import Login from "./components/Login";
import UserDetails from "./components/golfappMain/UserDetails";
import GolfClubFind from "./components/golfappMain/GolfClubFind";
import GolfCourseSelect from "./components/golfappMain/GolfCourseSelect";
import GolfCourseSelectTee from "./components/golfappMain/GolfCourseSelectTee";
import GolfCourseSelectPlayer from "./components/golfappMain/GolfCourseSelectPlayer";
import Scorecard from "./components/golfappMain/Scorecard";
import EvaluationCard from "./components/golfappMain/EvaluationCard";
import UserScorecards from "./components/golfappMain/UserScorecards";
import ScorecardById from "./components/golfappMain/ScorecardById";
import UserStatistics from "./components/golfappMain/UserStatistics";


function App() {
    const {login, logout, register, editUserDetails, user} = UserHook()
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/golfapp"} element={<UserMainPage logout={logout} />}/>
                    <Route path={"/golfapp/userdetails"} element={<UserDetails logout={logout} editUserDetails={editUserDetails}/>}/>
                    <Route path={"/golfapp/clubs"} element={<GolfClubFind logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses"} element={<GolfCourseSelect logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses/tees"} element={<GolfCourseSelectTee logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses/tees/round"} element={<GolfCourseSelectPlayer logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses/tees/round/scorecard"} element={<Scorecard logout={logout}/>}/>
                    <Route path={"/golfapp/finalscorecard"} element={<EvaluationCard logout={logout}/>}/>
                    <Route path={"/golfapp/rounds"} element={<UserScorecards logout={logout}/>}/>
                    <Route path={"/golfapp/round/:id"} element={<ScorecardById logout={logout}/>}/>
                    <Route path={"/golfapp/user/statistics"} element={<UserStatistics logout={logout}/>}/>
                </Route>
                <Route path="/register" element={<Register register={register}/>}/>
                <Route path="/login" element={<Login login={login}/>}/>
            </Routes>
        </div>
    );
}

export default App;
