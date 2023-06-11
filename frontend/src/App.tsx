import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import UserHook from "./components/hooks/UserHook";
import Home from "./components/Home";
import Register from "./components/Register";


function App() {
  const {register, user} = UserHook()

  return (
    <div className="App">
      <header className="App-header">
        <h1>GolfApp</h1>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path="/register" element={<Register register={register} />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
