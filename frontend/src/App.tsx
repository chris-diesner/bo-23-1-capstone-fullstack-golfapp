import React from 'react';
import './App.css';
import Login from "./components/Login";
import {Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserHook from "./components/hooks/UserHook";
import GolfApp from "./components/GolfApp";
import Home from "./components/Home";

function App() {
  const {login, user} = UserHook()

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path={"/"} element={<Home/>}/>
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
