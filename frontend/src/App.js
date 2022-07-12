//import './App.css';
import React, {useState, useEffect} from 'react';
import PlayerChoice from "./components/PlayerChoice";
import {Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import SkyrimDude from './assets/Skyrim_Dude.png';
import SkyrimBackground from './assets/background2.jpg'

function App() {

    // Cold Start. Initial Questions
    const [currentText, setCurrentText] = useState(0);
    const [currentJob, setCurrentJob] = useState("");
    const [currentPlaystyle, setCurrentPlaystyle] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const jobs = ["Warrior", "Thief", "Mage"]
    const playstyle = ["Explore", "Fight", "Loot"]
    const time = ["little time", "some time", "a lot of time", "no life"]
    const jobQuestion = ["Hi, my Name is Mike and I'd like to help you find the perfect quest. " +
    "To do that i need to know what class you are.", "What do you like to do?", "How long do you want to play?",
        "How can i help you?"]

    const text1s = ["I am a ", "I like to ", "I have "]
    const allDialogueOptions = [jobs, playstyle, time]

    const QuestionType = {
        'Job': 0,
        'Playstyle': 1,
        'Time': 2,
    }

    //Recomend me a quest:
    const [iscoldStart, setIsColdStart] = useState(true)
    const [isQuestStart, setIsQuestStart] = useState(true)
    const [needQuestFeedback, setNeedQuestFeedback] = useState(false)
    const questRecommendation = ["Quest", "Wildcard", "joke"]
    const questText1s = ["I want a new ", "Give me a ", "Tell me a ", "I want to "]

    const fakeAnswers = ["I recommend you do 'The Mind of Madness' quest in 'Pelagius Wing' next. " +
    "Go to 'Dervenin' for further instructions",
        "I recommend you raid 'Riften' next", "I wanted to prepare a joke but i took an arrow to the knee"]

    //todo feedback after player
    const afterRecommendation = ["I liked this quest", "I hated this quest"]
    const [questFeedback, setQuestFeedback] = useState("")
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

        if (index === 0) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({job: currentJob, playstyle: currentPlaystyle, time: currentTime})
            }
            fetch('/getQuest', requestOptions)
                .then(response => response.json()).then(data => {
                setQuestFromServer({name: data.name, location: data.location, npc: data.npc});
            });

            setQuestFeedback(true)
        }
        // todo: figure out a wildcard guess. probably done in backend later
        if (index === 1) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({job: "Mage", playstyle: "Talk", time: "Medium"})
            }
            fetch('/getQuest', requestOptions)
                .then(response => response.json()).then(data => {
                setQuestFromServer({name: data.name, location: data.location, npc: data.npc});
            });
            setQuestFeedback(true)
        }
    }

    //todo reset to menu and adapt recommender algorithm in backend
    function clickedRecommendation(index) {
        if (index === 1) {
            setNeedQuestFeedback(true);
        } else {
            // reset the dialogue tree to the menu
            setIsQuestStart(false)
            setQuestFeedback(false)
            setCurrentText(3)
        }
    }

    function updatePreferenceProfile(index) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fight: index === 1 ? -1 : 0,
                loot: index === 2 ? -1 : 0,
                explore: index === 0 ? -1 : 0
            })
        }
        fetch('/updatepp', requestOptions)
            .then(response => response.json()).then(data => {
            setQuestFromServer({name: data.name, location: data.location, npc: data.npc});
        });
        // reset the dialogue tree to the menu
        setIsQuestStart(false)
        setQuestFeedback(false)
        setNeedQuestFeedback(false)
        setCurrentText(3)
    }

    return (
        <div className="App">
            <Container style={{
                backgroundImage: `url(${SkyrimBackground})`,
                backgroundSize: "1800px",
                backgroundRepeat: "no-repeat",
                minHeight: "1800px",
            }}>
                <Row xs={2}><h1 style={{color: "white"}}>Skyrim uQuest</h1></Row>
                <Row style={{margin: "1rem"}}>
                    <Col xs={2}></Col>
                    <Col>
                        <Row><img style={{
                            marginTop: 10,
                            marginLeft: 200,
                            height: 650,
                            width: "auto",
                            transform: "scaleX(-1)"
                        }}
                                  src={SkyrimDude}/></Row>
                    </Col>
                    <Col xs={3}>
                        <Row>
                            {needQuestFeedback ?
                                <PlayerChoice choices={allDialogueOptions[1]} text1={text1s[1]} text2={' more!'}
                                              onClick={updatePreferenceProfile}></PlayerChoice>
                                : iscoldStart ?
                                    <PlayerChoice choices={allDialogueOptions[currentText]} text1={text1s[currentText]}
                                                  onClick={clickedOption} type={currentText}></PlayerChoice>
                                    :
                                    questFeedback ? (
                                            <PlayerChoice choices={afterRecommendation} onClick={clickedRecommendation}>
                                            </PlayerChoice>) :
                                        <PlayerChoice choices={questRecommendation} text1={questText1s}
                                                      onClick={clickedQuestChoice}></PlayerChoice>
                            }
                        </Row>
                    </Col>
                    <Col xs={1}></Col>
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={6}>
                            <Row>
                                <Col xs={3}></Col>
                                <Col xs={9} style={{
                                    color: "white",
                                    textAlign: "center"
                                }}>
                                    {needQuestFeedback ?
                                        <div>
                                            <h4>I'm sorry, what was the reason you didn't like this quest?</h4>
                                        </div>
                                        : isQuestStart ? (
                                            <div>
                                                <h4>{jobQuestion[currentText]}</h4>
                                            </div>
                                        ) : questFromServer && currentText != 2 ? (
                                                <div><h4>{"I recommend you do " + questFromServer.name + " in " +
                                                    questFromServer.location + " next. Go to " + questFromServer.npc +
                                                    " for further instructions."}</h4></div>)
                                            : (<div><h4>{fakeAnswers[currentText]}</h4></div>)
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
