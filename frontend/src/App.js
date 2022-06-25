import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

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
        <p>{currentText}</p>
      </header>
    </div>
  );
}

export default App;
