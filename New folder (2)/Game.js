import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Game.css';
import Footer from './Footer'


const Game = () => {
  const [secretNumber, setSecretNumber] = useState(generateSecretNumber());
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState('');
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false); // New state for game over

  function generateSecretNumber() {
    let num = '';
    while (num.length < 4) {
      let digit = Math.floor(Math.random() * 10);
      if (!num.includes(digit)) {
        num += digit;
      }
    }
    return num;
  }

  const checkGuess = () => {
    if (guess.length !== 4 || isNaN(guess)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: `Please enter a 4-digit number.`,
      });
      return;
    }

    setAttempts(attempts + 1);
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
      if (guess[i] === secretNumber[i]) {
        bulls++;
      } else if (secretNumber.includes(guess[i])) {
        cows++;
      }
    }

    setResult`(Bulls: ${bulls}, Cows: ${cows})`;
    setAttemptHistory([...attemptHistory, { guess, bulls, cows }]);

    if (bulls === 4) {
      setGameOver(true);
      Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: `You've guessed the number in ${attempts + 1} attempts!`,
      });
    }

    setGuess('');
  };

  const giveUp = () => {
    Swal.fire({
      icon: 'info',
      title: 'Game Over',
      text: `The secret number was: ${secretNumber}`,
    });
    setGameOver(true);
  };

  const startNewGame = () => {
    setSecretNumber(generateSecretNumber());
    setAttempts(0);
    setResult('');
    setAttemptHistory([]);
    setGameOver(false);
  };

  const showRules = () => {
    Swal.fire({
      icon: 'info',
      title: 'Game Rules',
      text: '1. Guess the 4-digit number.\n2. You will receive feedback with the number of bulls (correct digits in the correct position) and cows (correct digits in the wrong position).\n3. Keep guessing until you get all 4 bulls.\n4. You can click "Give Up" to reveal the secret number.',
      confirmButtonText: 'Got it!',
    });
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Cows and Bulls Game</h1>
      <p className="game-instructions">Guess the 4-digit number!</p>

      <input
        type="number"
        maxLength="4"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        className="guess-input"
        disabled={gameOver}
      />
      <button onClick={checkGuess} className="submit-btn" disabled={gameOver}>
        Submit Guess
      </button>

      {result && <div className="result">{result}</div>}
      <div className="attempts">
        <p>Attempts: {attempts}</p>
      </div>

      <div className="history">
        <h2>Guess History</h2>
        <ul className="history-list">
          
          {attemptHistory.map((entry, index) => (
            <li key={index} className="history-item">
              Guess: {entry.guess} - Bulls: {entry.bulls} - Cows: {entry.cows}
            </li>
          ))}
        </ul>
      </div>

      <div className="actions">
        <button onClick={giveUp} className="give-up-btn" disabled={gameOver}>
          Give Up
        </button>
        <button onClick={startNewGame} className="new-game-btn">
          New Game
        </button>
        <button onClick={showRules} className="rules-btn">
          Rules & Regulations
        </button>
        
      </div>
      <Footer/>
    </div>


  );
};

export default Game;