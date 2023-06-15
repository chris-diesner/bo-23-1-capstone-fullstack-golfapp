import React from 'react';
import '../styles/Home.css';
import {Container} from "react-bootstrap";

function Home() {
    return (
        <div className="HomeContainer">
            <Container className="d-flex flex-column justify-content-center">
                <div className="HomeContent">
                    <h3>Welcome To My GolfApp (WIP)</h3>
                    <br/>
                    <h5>What' new:</h5>
                    <ul>
                        <li>Basic Design</li>
                        <li>Display Error / Success Messages</li>
                    </ul>
                </div>
                <div className="btn-group">
                    <a href="/register" className="btn btn-primary">Sign Up</a>
                    <a href="/login" className="btn btn-primary">Login</a>
                </div>
            </Container>
        </div>
    );
}

export default Home;