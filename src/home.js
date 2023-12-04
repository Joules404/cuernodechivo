import React, { useState, useEffect } from 'react';
import './home.css';

const Body = function () {
	const [duration, setDuration] = useState(60);
	const [timeLeft, setTimeLeft] = useState(60);
	const [timerActive, setTimerActive] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [readOnly, setReadOnly] = useState(false)
	const [desiredTime, setDesiredTime] = useState(60); 
	const [wordCount, setWordCount] = useState(0);
	const [includePunctuation, setIncludePunctuation] = useState(false)
	const [includeNumbers, setIncludeNumbers] = useState(false)
	const [newWords, setNewWords] = useState(false)
	const [finished,setFinished] = useState(false)
	const [randomWords, setRandomWords] = useState('')
	const [numberOfDesiredWords, setNumberOfDesiredWords] = useState(30)
	const [minWordLength, setMinWordLength] = useState(2);
	const [maxWordLength, setMaxWordLength] = useState(7);

	useEffect(()=>{
		fetch('/words.json')
		.then((response)=>response.json())
		.then((data) => {
			const wordsJSON = Object.keys(data);//we need to do this, idk why
			//filter words on min/max length for difficulty setting
			const filteredWords = wordsJSON.filter((word) => {
				const wordLength = word.length;
				return wordLength >= minWordLength && wordLength <= maxWordLength;
			  });
			//shuffle words so it's not the same list each time
			//shuffle AFTER filtering for performance boost
			const shuffledWords = filteredWords.sort(() => Math.random() - 0.5);
			//join up
			const selectedWords = shuffledWords.slice(0, numberOfDesiredWords);
			setRandomWords(selectedWords.join(' '));
		})
		.catch((error) => {
			console.error('Error fetching JSON:', error);
		});
	},[numberOfDesiredWords, newWords, minWordLength, maxWordLength]);
	const characters = randomWords.length;
	var correct = 0;
	var incorrect = 0;
	var total = 0;
	useEffect(() => {
	  const words = inputValue.trim().split(/\s+/);
	  setWordCount(words.length);
	  const elements = compareTexts(inputValue, randomWords);
  }, [inputValue, randomWords]);
  
	const restart = () => {
	  setInputValue('');
	  setReadOnly(false)
	  setDuration(desiredTime)
	  setTimeLeft(desiredTime)
	  setTimerActive(false)
	  setDesiredTime(desiredTime)
	  setFinished(false)
	  document.getElementById("words").value='';
	  document.getElementById("timer").value='';
	}
	useEffect(() => {
	  let timerInterval;
	  if (timerActive && timeLeft > 0) {
		timerInterval = setInterval(() => {
		  setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);
	  } else if (timeLeft === 0) {
		if(timerInterval){
		  clearInterval(timerInterval);
		}
		setTimerActive(false);
		setReadOnly(true)
		// const allTypedEntries = correct + incorrect;
		// const uncorrectedErrors = incorrect;
		// const time = duration / 60;
		// const netwpm = ((allTypedEntries/5)-uncorrectedErrors)/time;
	  }
	  return () => {
		clearInterval(timerInterval);
	  };
	}, [timerActive, timeLeft]);
  
	const handleStart = () => {
	  if (duration > 0 && !timerActive) {
		setTimerActive(true);
		setTimeLeft(desiredTime);
		setFinished(false)
	  }
	};
  
	const handleStop = () => {
	  setTimerActive(false);
	  setFinished(true)
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
	  for (let i = 0; i < sentence.length; i++) {
		const char = sentence[i];
		if (i < inputText.length) {
		  if (inputText[i] === char) {
			correct++;
			elements.push(
			  <span key={i} style={{ color: "green", textDecoration: "underline" }}>
				{char}
			  </span>
			);
		  } else {
			incorrect++;
			elements.push(
			  <span key={i} style={{ color: "red", textDecoration: "underline" }}>
				{char}
			  </span>
			);
		  }
		} else {
		  elements.push(
			<span key={i} style={{ color: "black" }}>
			  {char}
			</span>
		  );
		}
	  }
	  total = correct + incorrect;
	  return elements;
	}
	
  
	return (
	  <div class="App">
		<div class="wrapper"> 
		   {/* <p><a href='#'>Sign in</a> | <a href='#'>Register</a></p> */}
		  <input id = 'words'type="text" placeholder="WORDS (MAX 500)" onInput={(e)=>{
			e.target.value = e.target.value.replace(/[^0-9]/, '')
			if(e.target.value === ''){
			  setNumberOfDesiredWords(30)
			}else setNumberOfDesiredWords(e.target.value)
		  }} autoComplete='new-password'></input>
		  <input type="text" placeholder="TIME (60 seconds)" onChange={updateTimer} id="timer" onInput={(e)=>{
			e.target.value = e.target.value.replace(/[^0-9]/, '')
		  }}></input>
		  {/*
		  <input type="text" placeholder={includePunctuation ? 'PUNCTUATION (ON)' : 'PUNCTUATION (OFF)'} readOnly onClick={()=>{
			setIncludePunctuation(!includePunctuation)
		  }}></input>
		  <input type="text" placeholder={includeNumbers ? 'NUMBERS (ON)' : 'NUMBERS (OFF)'} readOnly onClick={()=>{
			setIncludeNumbers(!includeNumbers)
		  }}></input>
		  */}		
		<div className="difficulty-buttons">
			<button onClick={() => {
				setMinWordLength(1);
				setMaxWordLength(5);
				setNewWords(!newWords);
				restart();
			}}>Easy</button>
			<button onClick={() => {
				setMinWordLength(2);
				setMaxWordLength(7);
				setNewWords(!newWords);
				restart();
			}}>Normal</button>
			<button onClick={() => {
				setMinWordLength(5);
				setMaxWordLength(Infinity);
				setNewWords(!newWords);
				restart();
			}}>Hard</button>
			</div>
		</div>
		<div class = "textarea-container">
			<div className="custom-textarea"
			style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }} >
			{compareTexts(inputValue, randomWords)}
			</div>
		</div>
		<input
		  autoComplete='off'
		  readOnly={readOnly}
		  placeholder="Enter text here..."
		  type="text"
		  id="inputBox"
		  value={inputValue}
		  onChange={(e) => {
			setInputValue(e.target.value)
			handleStart();
			compareTexts(e.target.value,randomWords)
			var words = e.target.value.trim().split(/\s+/);
			var letters = e.target.value.split('')
			setWordCount(words.length);
			console.log(letters.length)
			console.log(randomWords.length)
			if(letters.length === randomWords.length){
			  setReadOnly(true);
			  handleStop();
			  setTimerActive(false);
			}
		  }}
		  style={{width:"40%", height:"2em"}}
		>
		</input>
		<br></br>
		<div class = "wrapper">
		<button onClick={()=>{
		  setNewWords(!newWords)
		  restart()
  
		}}>Generate New Words</button>
		<button onClick={restart}>Restart</button>
		<button onClick={() => {
		 setReadOnly(true);
		 handleStop();
		}}>Submit</button>
		</div>
		<div>
		  <p style={{fontSize:"40px"}}>Time Left: {timeLeft}s</p>
		</div>
		{finished && (
		  <div>
			<p style={{fontSize:"30px"}}>Words per Minute: {((total/5)/((desiredTime-timeLeft)/60)).toFixed(2)}</p>
			<p style={{fontSize:"30px"}}>Accuracy: {((correct)/(total) * 100).toFixed(2)}%</p>
			{/*<p style={{fontSize:"30px"}}>Net WPM: {(((total/5)-incorrect)/((desiredTime-timeLeft)/60)).toFixed(2)}</p>
			 	TODO: incorrect formula? fix and use later*/}
			<p style={{fontSize:"20px"}}>Total: {total}/{characters}  |  Correct: {correct}  |  Incorrect: {incorrect} </p>
		</div>
		)}
	</div>
  
	);
  }
  
export default Body;