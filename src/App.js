import './App.css';
import React, { useState, useEffect } from 'react';



function App() {

  const randomSentence =
    "In the heart of a bustling testing city, people rush to work, while the sun casts a warm glow on the tall buildings." +
    "Coffee shops line the streets, offering a brief respite from the daily grind."


  return (
    <div className="App">
      <Body sentence={randomSentence} />
    </div>
  );
} //testing right now again



const Body = function (props) {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [readOnly, setReadOnly] = useState(false)
  const [desiredTime, setDesiredTime] = useState(60); 
  const [wordCount, setWordCount] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [wpm, setWPM] = useState(0); 
  const restart = () => {
    setInputValue('');
    setReadOnly(false)
    setDuration(60)
    setTimeLeft(60)
    setTimerActive(false)
    setDesiredTime(60)
    document.getElementById("timer").value='';

  }
  useEffect(() => {
    let timerInterval;

    if (timerActive && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerInterval);
      setTimerActive(false);
      ////display WPM
      if (wordCount > 0 && (duration - timeLeft) > 0) {
        const netWPM = ((wordCount - incorrect) / ((duration - timeLeft) / 60)).toFixed(2);
        setWPM(netWPM);
      }
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerActive, timeLeft]);

  const handleStart = () => {
    if (duration > 0 && !timerActive) {
      setTimerActive(true);
      setTimeLeft(desiredTime);
    }
  };

  const handleStop = () => {
    setTimerActive(false);
  };

  const updateTimer = (e) => {
    const value = parseInt(e.target.value, 10); 
    if (!isNaN(value)) {
      setDesiredTime(value); 
      setTimeLeft(value); 
    }
  }
  function compareTexts(inputText, sentence) {
    const elements = [];
    var correct = 0;
    var incorrect_=0;
    let i = 0;
    for (i = 0; i < sentence.length; i++) {
      const char = sentence[i];
      if (i < inputText.length) {
        if (inputText[i] === char) {
          correct++;
          elements.push(
            <span key={i} style={{ color: "green", textDecoration:"underline"}}>
              {char}
            </span>
          );
        } else {
          incorrect_++;
          elements.push(
            <span key={i} style={{ color: "red" , textDecoration:"underline"}}>
              {char}
            </span>
          );
        }
      } else {
        elements.push(
          <span key={i} style={{ color: "black"}}>
            {char}
          </span>
        );
      }
    }
    // if(correct+incorrect_=== 0) {
    //   console.log("hello world")
    // }else{
    //   console.log("correct: " + correct)
    //   console.log("incorrect: " + incorrect_)
    //   var time = duration - timeLeft;
    //   wpm = Math.floor(wordCount / (time/60));
    // }
    // setIncorrect(incorrect_);
    // const netWPM = ((wordCount - incorrect) / ((duration - timeLeft) / 60)).toFixed(2);
    // setWPM(netWPM);
    return elements;
  }
  return (
    <div class="App">
      <div class="wrapper">
        <p><a href='#'>Sign in</a> | <a href='#'>Register</a></p>
        <input type="text" placeholder="WORDS" readOnly></input>
        <input type="number" placeholder="DESIRED TIME (secs.)" onChange={updateTimer} id="timer" ></input>
        <input type="text" placeholder="PUNCTUATION" readOnly></input>
        <input type="text" placeholder="NUMBERS" readOnly></input>
    </div>
    <div class = "textarea-container">
      <div
        className="custom-textarea"
        style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
      >
        {compareTexts(inputValue, props.sentence)}
      </div>
    </div>
      <input
        readOnly={readOnly}
        placeholder="Enter text here..."
        type="text"
        id="inputBox"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          handleStart();
          compareTexts(e.target.value,props.sentence)
          var words = e.target.value.trim().split(/\s+/);
          setWordCount(words.length);
        }}
        style={{width:"40%", height:"2em"}}
      >
      </input>

      <br></br>
      <div class = "wrapper">
      <button onClick={restart}>Restart</button>
      <button onClick={() => {
       setReadOnly(true);
       handleStop();
       const netWPM = ((wordCount - incorrect) / (duration - timeLeft) * 60).toFixed(2);
      }}>Submit</button>
      </div>
      <div>
        <p style={{fontSize:"40px"}}>Time Left: {timeLeft}</p>
        {/* <p style={{fontSize:"20px"}}>WPM: {wpm}</p> */}

      </div>

    </div>

  );
}



export default App;
