import React from 'react';
import '../styles/Home.css';

function Home() {
    return (
        <div className="Home">
            <h3>Welcome To My GolfApp (WIP)</h3>
            <br/>
            <h5>What' new:</h5>
            <ul>
                <li>Added a Register Page</li>
                <li>Email & Password Validation</li>
            </ul>
            <button onClick={() => window.location.href = "/register"}>Register</button>
            <br/>
        </div>
    );
}

export default Home;