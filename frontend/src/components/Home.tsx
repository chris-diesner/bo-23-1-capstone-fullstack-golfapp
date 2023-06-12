import React from 'react';

function Home() {
    return (
        <div className="Home">
            <h3>Welcome To My GolfApp (WIP)</h3>
            <br/>
            <h5>What' new:</h5>
            <p>Added a Register Page</p>
            <button onClick={() => window.location.href = "/register"}>Register</button>
        </div>
    );
}

export default Home;