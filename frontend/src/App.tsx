import React from 'react';
import './App.css';
import Login from "./components/Login";
import {Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserHook from "./components/hooks/UserHook";
import GolfApp from "./components/GolfApp";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  const {login, register, user} = UserHook()

  return (
    <div className="App">
      <header className="App-header">
        <h1>GolfApp</h1>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path="/register" element={<Register register={register} />} />
          <Route element={<ProtectedRoutes user={user}/>}>
            <Route path={"/golfapp"} element={<GolfApp/>}/>
          </Route>

          <Route path={"/login"} element={<Login login={login}/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
