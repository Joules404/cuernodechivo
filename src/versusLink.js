import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './versusLink.css'; 

const generateVersusDetails = (maxWords, time) => {
	const minWordLength = 2;	//normal diff
	const maxWordLength = 7;
	const numberOfDesiredWords = maxWords;

	const getRandomWords = () => {
		return ['apple', 'banana', 'cherry', 'orange', 'grape', 'kiwi', 'melon', 'pear', 'plum', 'berry'].join(' ');
	};
	return {
		maxWords,
		time,
		randomWords: getRandomWords(),
	};
};

const VersusLink = () => {
	const [maxWords, setMaxWords] = useState(30);
	const [time, setTime] = useState(60);
	const [inputPlayer1, setInputPlayer1] = useState('');
	const [inputPlayer2, setInputPlayer2] = useState('');
	const [randomWords, setRandomWords] = useState('');

	useEffect(() => {
		const testDetails = generateVersusDetails(maxWords, time);
		setRandomWords(testDetails.randomWords);
	}, [maxWords, time]);

//html
	return (
		<div className="versus-link-container">
			<div className="word-container">
				<p>{randomWords}</p>
			</div>
			<div className="player-containers">
				<div className="player1-container">
					<textarea 
						value={inputPlayer1}
					/>
					<h3>Player 1</h3>
				</div>
				<div className="player2-container">
					<textarea 
						value={inputPlayer2}
						//don't really know what to have here, it's not live so maybe nothing?
						//value only updates at end since not real-time
					/>
					<h4>Player 2</h4>
				</div>
				</div>
			</div>
	);
};
export default VersusLink;
