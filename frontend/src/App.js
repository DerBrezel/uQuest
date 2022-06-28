//import './App.css';
import React, {useState, useEffect} from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import PlayerChoice from "./components/PlayerChoice";
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import SkyrimDude from './assets/Skyrim_Dude.png';

function App() {

    // I Hardcode because i am lazy.
    const [currentText, setCurrentText] = useState(0);
    const [currentJob, setCurrentJob] = useState("");
    const [currentPlaystyle, setCurrentPlaystyle] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const jobs = ["Warrior", "Thief", "Mage"]
    const playstyle = ["Explore", "Talk", "Fight", "Loot"]
    const time = ["Short", "Medium", "Long", "NoLife"]
    const jobQuestion = "What class do you like to play?"

    const text1s = ["I am a ", "I like to ", "My Time is "]
    const allDialogueOptions=[jobs, playstyle, time]

    const QuestionType = {
        'Job': 0,
        'Playstyle': 1,
        'Time': 2,
    }

    // This is how we will fetch data from the server.
    /*useEffect(() => {
        fetch('/hello').then(res => res.json()).then(data => {
            setCurrentText(data.text);
        });
    }, []);
    */

    function clickedOption(option, type) {
        if (type === QuestionType.Job) {
            setCurrentJob(jobs[option])
            setCurrentText(1)
        }
        if (type === QuestionType.Playstyle) {
            setCurrentPlaystyle(playstyle[option]);
            setCurrentText(2)
        }
        if (type === QuestionType.Time) {
            setCurrentTime(time[option])
        }
    }

    return (
        <div className="App">
            <Container>
                <Row xs={2}><h1>Skyrim uQuest</h1></Row>
                <Row style={{margin: "1rem"}}>
                    <Col xs={3}>
                        <Row>
                            <PlayerChoice choices={allDialogueOptions[currentText]} text1={text1s[currentText]}
                                          onClick={clickedOption} type={currentText}></PlayerChoice>
                        </Row>
                    </Col>
                    <Col>
                        <Row><img style={{height: 650, width: "auto"}} src={SkyrimDude}/></Row>
                    </Col>
                    <Row>
                        <Col xs={6}>
                            <Row>
                                <TypeWriterEffect
                                    textStyle={{fontFamily: 'Red Hat Display'}}
                                    startDelay={100}
                                    cursorColor="black"
                                    text={jobQuestion}
                                    typeSpeed={100}
                                    scrollArea={App}
                                    hideCursorAfterText={true}
                                />
                                <p>You have chosen: {currentJob} and {currentPlaystyle} and {currentTime}</p>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </div>
    );
}

export default App;
