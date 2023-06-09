import React from 'react';
import '../styles/App.css';
import {Container} from "react-bootstrap";
import Logo from "../media/easySwing_logo.png"
import {motion} from "framer-motion";

function Home() {
    return (
        <motion.div className="App-Page" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <header className="App-Header">
                <img src={Logo} alt="Logo"></img>
            </header>
            <div className="AppContainer">
                <Container className="d-flex flex-column justify-content-center">
                    <div className="HomeContent">
                        <br/>
                        <h5>Your new golf experience begins now</h5>
                        <br/>
                        <p/>
                        <p>Let's get started.</p>
                    </div>
                    <div className="btn-group">
                        <a href="/register" className="btn btn-secondary">Sign Up</a>
                        <a href="/login" className="btn btn-secondary">Login</a>
                    </div>
                </Container>
            </div>
        </motion.div>
    );
}

export default Home;