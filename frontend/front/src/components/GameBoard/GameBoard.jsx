// GameBoard.jsx
import React, { useState, useEffect } from 'react';
import Curtain from '../../components/Curtain/Curtain';
import './GameBoard.css';
import SoundManager from '../../components/SoundManager/SoundManager';

const CAR_IMAGES = ["../src/assets/images/car1.png", "../src/assets/images/car2.png"];
const GOAT_IMAGES = ["../src/assets/images/goat1.png", "../src/assets/images/goat2.png"];
const COLORS = [
    '#FF5733', '#33FF57', '#5733FF', '#F3FF33', '#33FFF3',
    '#FF33F6', '#FF8833', '#88FF33', '#3388FF', '#FF33B0',
    '#FF5533', '#55FF33', '#3355FF', '#FF3388', '#B033FF',
    '#FFAA33', '#AAFF33', '#33AAFF', '#FF33DD', '#D033FF',
    '#FFDD33', '#DDFF33', '#33DDFF', '#FF33AA', '#A033FF'
];

function GameBoard() {
    const [selectedCurtain, setSelectedCurtain] = useState(null);
    const [revealedCurtain, setRevealedCurtain] = useState(null);
    const [carBehind, setCarBehind] = useState(Math.floor(Math.random() * 3) + 1);
    const [carImgSrc, setCarImgSrc] = useState(CAR_IMAGES[Math.floor(Math.random() * CAR_IMAGES.length)]);
    const [goatImgSrc, setGoatImgSrc] = useState(GOAT_IMAGES[Math.floor(Math.random() * GOAT_IMAGES.length)]);
    const [curtainColors, setCurtainColors] = useState([]);
    const [gameState, setGameState] = useState('SELECT');
    const [currentRound, setCurrentRound] = useState(1);
    const [totalWins, setTotalWins] = useState(0);
    const [didSwitch, setDidSwitch] = useState(false);
    const [totalGames, setTotalGames] = useState(0);
    const [switchWins, setSwitchWins] = useState(0);
    const [switchLosses, setSwitchLosses] = useState(0);
    const [stickWins, setStickWins] = useState(0);
    const [stickLosses, setStickLosses] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const randomColors = Array(3).fill(0).map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
        setCurtainColors(randomColors);
    }, []);

    const sendGameResults = async () => {
        const probability = (totalWins / 10) * 100;

        const payload = {
            total_wins: totalWins,
            total_games: 10,
            switch_wins: switchWins,
            switch_losses: switchLosses,
            stick_wins: stickWins,
            stick_losses: stickLosses,
            probability: probability
        };

        console.log("Sending payload:", payload);

        try {
            const response = await fetch('http://localhost:8000/api/monty_hall/gameruns/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`API call failed with status ${response.status}: ${text}`);
            }

            const data = await response.json();
            console.log("Response data:", data);
            setHasSubmitted(true);  // Set to true when successfully submitted
        } catch (error) {
            console.error("Failed to send game results:", error);
        }
    };

    const handleCurtainSelection = (curtainNumber) => {
        if (gameState === 'SELECT') {
            setSelectedCurtain(curtainNumber);
            let goatCurtain;
            do {
                goatCurtain = Math.floor(Math.random() * 3) + 1;
            } while (goatCurtain === curtainNumber || goatCurtain === carBehind);
            setRevealedCurtain(goatCurtain);
            setGameState('DECIDE');
        }
    };

    // 
    const handleDecision = (decision) => {
        let switched = false;
        let finalCurtain = selectedCurtain;
        if (decision === "SWITCH") {
            switched = true;
            const otherCurtains = [1, 2, 3].filter(c => c !== selectedCurtain && c !== revealedCurtain);
            finalCurtain = otherCurtains[0];
            setSelectedCurtain(finalCurtain);
        }
    
        setDidSwitch(switched);  // Update didSwitch state variable here
    
        setGameState('RESULT');
    
        if (finalCurtain === carBehind) {
            setTotalWins(prevWins => prevWins + 1);
            if (switched) {
                setSwitchWins(prevSwitchWins => prevSwitchWins + 1);
            } else {
                setStickWins(prevStickWins => prevStickWins + 1);
            }
        } else {
            if (switched) {
                setSwitchLosses(prevSwitchLosses => prevSwitchLosses + 1);
            } else {
                setStickLosses(prevStickLosses => prevStickLosses + 1);
            }
        }
    };
    
    

    const playAgain = () => {
        if (currentRound < 10) {
            setCurrentRound(prevRound => prevRound + 1);
        }
        setSelectedCurtain(null);
        setRevealedCurtain(null);
        setCarBehind(Math.floor(Math.random() * 3) + 1);
        setCarImgSrc(CAR_IMAGES[Math.floor(Math.random() * CAR_IMAGES.length)]);
        setGoatImgSrc(GOAT_IMAGES[Math.floor(Math.random() * GOAT_IMAGES.length)]);
        setGameState('SELECT');
        const randomColors = Array(3).fill(0).map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
        setCurtainColors(randomColors);
    };

    return (
        <div className="gameboard-container">
            <SoundManager gameState={gameState} revealedCurtain={revealedCurtain} carBehind={carBehind} currentRound={currentRound}  hasSubmitted={hasSubmitted} selectedCurtain={selectedCurtain} />

            <div className="statistics">
                <p>Round: {currentRound} of 10</p>
                <p>Total Wins: {totalWins}</p>
                <p>Probability: {((totalWins / currentRound) * 100).toFixed(2)}%</p>
            </div>

            {[1, 2, 3].map((curtainNumber) => (
                <Curtain 
                    key={curtainNumber} 
                    number={curtainNumber}
                    color={curtainColors[curtainNumber - 1]}
                    onSelect={() => handleCurtainSelection(curtainNumber)}
                    revealed={(gameState === 'DECIDE' && curtainNumber === revealedCurtain) || (gameState === 'RESULT' && (curtainNumber === selectedCurtain || curtainNumber === revealedCurtain))}
                    carBehind={curtainNumber === carBehind}
                    imgSrc={curtainNumber === carBehind ? carImgSrc : goatImgSrc}
                />
            ))}
            
            {gameState === 'DECIDE' && (
                <div className="decision-buttons">
                    <button onClick={() => handleDecision("STICK")}>Stick with current curtain</button>
                    <button onClick={() => handleDecision("SWITCH")}>Switch to other curtain</button>
                </div>
            )}
            
            {gameState === 'RESULT' && (
                <div>
                    {selectedCurtain === carBehind ? "Congratulations! You won the car!" : "You got a goat. Better luck next time!"}
                    <p>{didSwitch ? "You switched curtains." : "You stuck with your original choice."}</p>
                    {currentRound !== 10 && <button onClick={playAgain}>Play Again</button>}
                    
                    {currentRound === 10 && (
                        <div>
                            <h2>Game Over!</h2>
                            <p>You won {totalWins} out of 10 rounds.</p>
                            <p>Probability of winning: {(totalWins/10)*100}%</p>
                            <button onClick={sendGameResults} disabled={hasSubmitted}>
                                {hasSubmitted ? "Results Submitted" : "Submit Results"}
                            </button>
                            <button onClick={() => {
                                setCurrentRound(1);
                                setTotalWins(0);
                                setHasSubmitted(false); // Reset the hasSubmitted state
                                playAgain();
                            }}>Play Again</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default GameBoard;







//This program is the main component of the game. It is responsible for rendering the game board and the curtain components. It also handles the logic of the game and the statistics of the game. It also sends the game results to the backend.  Future improvements include adding a leaderboard to the game and adding a login system to the game as well.  I currently have a django backend that is being used for the sqlite database to store the game results.  I also have a django rest framework api that is being used to send the game results to the backend.

//This component is handeling more logic than it should and should be refactored in the following ways:  Spliting up some of the logic by creating more components.  Creating a seperate component for the statistics and the game results.  
