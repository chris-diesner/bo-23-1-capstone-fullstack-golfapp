import React from 'react';

function Home() {



    return (
        <div>
            <h3>Welcome To My GolfApp (WIP)</h3>
            <br/>
            <h5>What' new:</h5>
            <p>Added a Login Page</p>
            <button onClick={() => window.location.href = "/register"}>Register</button>
            <button onClick={() => window.location.href = "/login"}>Login</button>
        </div>
    );
}

export default Home;