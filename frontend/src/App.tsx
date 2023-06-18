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
import {GolfCourse} from "./models/GolfCourse";
import {GolfClub} from "./models/GolfClub";


function App() {
    const {login, logout, register, getUserDetails, editUserDetails, user} = UserHook()
    const handleSelectedClub = (club: GolfClub) => {
        console.log('Selected Golf Course:', club);
        // Hier kannst du die ausgewählten Golfplatzdaten speichern oder andere Aktionen durchführen
    }
    return (
        <div className="App">
            <h1>GolfApp</h1>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/golfapp"} element={<UserMainPage logout={logout} getUserDetails={getUserDetails} />}/>
                    <Route path={"/golfapp/userdetails"} element={<UserDetails logout={logout} editUserDetails={editUserDetails}/>}/>
                    <Route path={"/golfapp/clubs"} element={<GolfClubFind onSelectedClub={handleSelectedClub} logout={logout}/>}/>
                    <Route path={"/golfapp/clubs/courses"} element={<GolfCourseSelect logout={logout}/>}/>
                </Route>
                <Route path="/register" element={<Register register={register}/>}/>
                <Route path="/login" element={<Login login={login}/>}/>
            </Routes>
        </div>
    );
}

export default App;
