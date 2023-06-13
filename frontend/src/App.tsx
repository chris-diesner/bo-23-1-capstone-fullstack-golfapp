import React from 'react';
import './styles/App.css';
import {Route, Routes} from "react-router-dom";
import UserHook from "./components/hooks/UserHook";
import Home from "./components/Home";
import Register from "./components/Register";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const {register} = UserHook()

  return (
    <div className="App">
        <h1>GolfApp</h1>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path="/register" element={<Register register={register} />} />
        </Routes>
    </div>
  );
}

export default App;
