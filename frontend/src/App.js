import './App.css';
import React, {useState, useEffect} from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import PlayerChoice from "./components/PlayerChoice";

function App() {

    // I Hardcode because i am lazy.
    const [currentText, setCurrentText] = useState("");
    const [currentJob, setCurrentJob] = useState("");
    const [currentPlaystyle, setCurrentPlaystyle] = useState("");
    const jobs = ["Warrior", "Thief", "Mage"]
    const playstyle = ["Explore", "Talk", "Fight", "Loot"]

    // This is how we will fetch data from the server.
    useEffect(() => {
        fetch('/hello').then(res => res.json()).then(data => {
            setCurrentText(data.text);
        });
    }, []);

    function clickedJobOption(option){
        setCurrentJob(jobs[option]);
    }

        function clickedPlaystyleOption(option){
        setCurrentPlaystyle(playstyle[option]);
    }

    return (
        <div className="App">
            <div className="App-header">
                <p>The text that the server send is:</p>
                <TypeWriterEffect
                    textStyle={{fontFamily: 'Red Hat Display'}}
                    startDelay={100}
                    cursorColor="black"
                    text={currentText}
                    typeSpeed={100}
                    hideCursorAfterText={true}
                />
            </div>
            <div>
                <p>You have chosen: {currentJob}</p>
                <PlayerChoice choices={jobs} text1={"I am a "} onClick={clickedJobOption}></PlayerChoice>

                <p>You have chosen: {currentPlaystyle}</p>
                <PlayerChoice choices={playstyle} text1={"I want to "} onClick={clickedPlaystyleOption}></PlayerChoice>
            </div>
        </div>
    );
}

export default App;
