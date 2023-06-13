import React from 'react';
import './styles/App.css';
import {Route, Routes} from "react-router-dom";
import UserHook from "./components/hooks/UserHook";
import Home from "./components/Home";
import Register from "./components/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserMainPage from "./components/golfappMain/UserMainPage";
import Login from "./components/Login";

function App() {
    const {login, register, user} = UserHook()

    return (
        <div className="App">
            <h1>GolfApp</h1>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/golfapp"} element={<UserMainPage/>}/>
                </Route>
                <Route path="/register" element={<Register register={register}/>}/>
                <Route path="/login" element={<Login login={login}/>}/>
            </Routes>
        </div>
    );
}

export default App;
