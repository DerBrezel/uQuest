//import './App.css';
import React, {useState, useEffect} from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import PlayerChoice from "./components/PlayerChoice";
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import SkyrimDude from './assets/Skyrim_Dude.png';

function App() {

    // I Hardcode because i am lazy.
    const [currentText, setCurrentText] = useState("");
    const [currentJob, setCurrentJob] = useState("");
    const [currentPlaystyle, setCurrentPlaystyle] = useState("");
    const jobs = ["Warrior", "Thief", "Mage"]
    const playstyle = ["Explore", "Talk", "Fight", "Loot"]
    const jobQuestion = "What class do you like to play?"

    // This is how we will fetch data from the server.
    /*useEffect(() => {
        fetch('/hello').then(res => res.json()).then(data => {
            setCurrentText(data.text);
        });
    }, []);
    */

    function clickedJobOption(option) {
        setCurrentJob(jobs[option]);
    }

    function clickedPlaystyleOption(option) {
        setCurrentPlaystyle(playstyle[option]);
    }

    return (
        <div className="App">
            <Container>
                <Row xs={2}><h1>Skyrim uQuest</h1></Row>
                <Row style={{margin: "1rem"}}>
                    <Col xs={3}>
                        <p>Answers</p>
                        <PlayerChoice choices={jobs} text1={"I am a "} onClick={clickedJobOption}></PlayerChoice>
                    </Col>
                    <Col xs={6}>
                        <Row><img height={500} src={SkyrimDude}/></Row>
                        <Row>
                             <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }}
            startDelay={100}
            cursorColor="black"
            text={jobQuestion}
            typeSpeed={100}
            scrollArea={App}
            hideCursorAfterText={true}
          />
                            <p>You have chosen: {currentJob}</p>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
