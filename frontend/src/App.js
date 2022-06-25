import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import TypeWriterEffect from 'react-typewriter-effect';

function App() {

  const [currentText, setCurrentText] = useState("");

  // This is how we will fetch data from the server.
  useEffect(()=>{
    fetch('/hello').then(res => res.json()).then(data => {
      setCurrentText(data.text);
    });
  },[]);


  return (
    <div className="App">
      <header className="App-header">
        <p>The text that the server send is:</p>
         <TypeWriterEffect
            textStyle={{ fontFamily: 'Red Hat Display' }}
            startDelay={100}
            cursorColor="black"
            text={currentText}
            typeSpeed={100}
            hideCursorAfterText={true}
          />
      </header>
    </div>
  );
}

export default App;
