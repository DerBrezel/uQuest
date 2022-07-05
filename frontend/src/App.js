//import './App.css';
import React, {useState, useEffect} from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import PlayerChoice from "./components/PlayerChoice";
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import SkyrimDude from './assets/Skyrim_Dude.png';
import SkyrimBackground from './assets/background.jpg'

function App() {

    // Cold Start. Initial Questions
    const [currentText, setCurrentText] = useState(0);
    const [currentJob, setCurrentJob] = useState("");
    const [currentPlaystyle, setCurrentPlaystyle] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const jobs = ["Warrior", "Thief", "Mage"]
    const playstyle = ["Explore", "Talk", "Fight", "Loot"]
    const time = ["Short", "Medium", "Long", "NoLife"]
    const jobQuestion = ["What class do you like to play?", "What do you like to do?", "How long do you want to play?",
        "How can i help you?"]

    const text1s = ["I am a ", "I like to ", "My Time is "]
    const allDialogueOptions = [jobs, playstyle, time]

    const QuestionType = {
        'Job': 0,
        'Playstyle': 1,
        'Time': 2,
    }

    //Recomend me a quest:
    const [iscoldStart, setIsColdStart] = useState(true)
    const [isQuestStart, setIsQuestStart] = useState(true)
    const questRecommendation = ["Quest", "Wildcard", "joke", "to quit"]
    const questText1s = ["I want a new ", "Give me a ", "Tell me a ", "I want to "]

    const fakeAnswers = ["I recommend you do 'The Mind of Madness' quest in 'Pelagius Wing' next. " +
    "Go to 'Dervenin' for further instructions",
        "I recommend you raid 'Riften' next", "I wanted to prepare a joke but i took an arrow to the knee", "Thank you for using me"]

    const [questFromServer, setQuestFromServer] = useState("")
    // This is how we will fetch data from the server and save the important values.
    useEffect(() => {
        fetch('/getQuest').then(res => res.json()).then(data => {
            console.log("I have fetched " + data.name)
            setQuestFromServer({name: data.name, location: data.location, npc: data.npc});
        });
    }, []);

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
            setIsColdStart(false)
            setCurrentText(3)
        }
    }

    function clickedQuestChoice(index) {
        setIsQuestStart(false)
        setCurrentText(index)
    }

    return (
        <div className="App">
            <Container style={{
                backgroundImage: `url(${SkyrimBackground})`,
                backgroundSize: "1500px",
                backgroundRepeat: "no-repeat"
            }}>
                <Row xs={2}><h1>Skyrim uQuest</h1></Row>
                <Row style={{margin: "1rem"}}>
                    <Col xs={2}></Col>
                    <Col xs={3}>
                        <Row>
                            {iscoldStart ?
                                <PlayerChoice choices={allDialogueOptions[currentText]} text1={text1s[currentText]}
                                              onClick={clickedOption} type={currentText}></PlayerChoice>
                                :
                                <PlayerChoice choices={questRecommendation} text1={questText1s}
                                              onClick={clickedQuestChoice}></PlayerChoice>
                            }
                        </Row>
                    </Col>
                    <Col>
                        <Row><img style={{height: 650, width: "auto"}} src={SkyrimDude}/></Row>
                    </Col>
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={6}>
                            <Row>
                                <Col xs={3}></Col>
                                <Col xs={9} style={{
                                    minWidth: "800px",
                                    border: "3px solid black",
                                    borderRadius: "5px",
                                    background: "rgb(201, 201, 201, 0.5)",
                                }}>
                                    {isQuestStart ? (
                                        <div>
                                            <h1>{jobQuestion[currentText]}</h1>
                                            <p>You have
                                                chosen: {currentJob} {currentJob ? "and" : ""} {currentPlaystyle}
                                                {currentPlaystyle ? "and" : ""} {currentTime}</p>
                                        </div>
                                    ) : questFromServer ? (
                                            <div><h2>{"I recommend you do " + questFromServer.name + " in " +
                                                questFromServer.location + " next. Go to " + questFromServer.npc +
                                                " for further instructions."}</h2></div>)
                                        : (<div><h1>{fakeAnswers[currentText]}</h1></div>)
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
                <Row xs={1}></Row>
            </Container>
        </div>
    );
}

export default App;
