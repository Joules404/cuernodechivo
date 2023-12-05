import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './versus.css';

const Versus = () => {
	const [maxWords, setMaxWords] = useState(30);
	const [time, setTime] = useState(60);
	const navigate = useNavigate();

	const createTest = () => {
		// generate link randomly and then navigate there
		const linkID = Math.random().toString(36).substr(2, 9);
		const link = `/versus/${linkID}`;
		navigate(link);
};

	return (
		<div className="versus-container">
			<h2>Versus Typing Test</h2>
			<div>
				<input 
					id = 'words'
					type="text" 
					placeholder="WORDS (MAX 500)" 
					onInput={(e)=>{e.target.value = e.target.value.replace(/[^0-9]/, '')}}
				>
				</input>
				<input 
					type="text" 
					placeholder="TIME (60 seconds)" id="timer" onInput={(e)=>{
					e.target.value = e.target.value.replace(/[^0-9]/, '')}}
				>
				</input>
			</div>
			<button onClick={createTest}>Create Typing Test</button>
		</div>
	);
}

export default Versus;
