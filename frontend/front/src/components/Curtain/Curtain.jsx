// Curtain.jsx
import React from 'react';
import './Curtain.css';

function Curtain({ number, onSelect, revealed, carBehind, imgSrc, color }) {
    return (
        <div onClick={onSelect} className={`curtain-container ${revealed ? 'revealed' : ''}`}>
            <div className={`curtain-content`} style={{backgroundColor: color}}>
                {`Curtain ${number}`}
            </div>
            <div className="reveal-content">
                {revealed 
                    ? <img src={imgSrc} alt={carBehind ? "Car" : "Goat"} /> 
                    : null}
            </div>
        </div>
    );
}

export default Curtain;


