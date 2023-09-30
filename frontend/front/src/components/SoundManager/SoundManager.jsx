// oundManager.jsx
import React, { useEffect, useState } from "react";

const CAR_SOUNDS = ["../src/assets/sounds/car_sound_one.m4a"];
const GOAT_SOUNDS = ["../src/assets/sounds/goats.m4a"];
const CROWD_SOUNDS = "../src/assets/sounds/crowd_sounds.m4a";

const SoundManager = ({ gameState, revealedCurtain, carBehind, currentRound, hasSubmitted, selectedCurtain }) => {
  const [shouldPlayCrowdSound, setShouldPlayCrowdSound] = useState(false);

  useEffect(() => {
    let audio;
    // Logic for Crowd sound with a 33% chance, only between rounds 1 and 10.
    if (Math.random() < 0.33) {
      setShouldPlayCrowdSound(true);
    } else {
      setShouldPlayCrowdSound(false);
    }

    if (shouldPlayCrowdSound) {
      audio = new Audio(CROWD_SOUNDS);
    }
  
    if (gameState === "DECIDE") {
      audio = new Audio(revealedCurtain === carBehind ? CAR_SOUNDS[0] : GOAT_SOUNDS[0]);
    }
  
    if (gameState === "RESULT") {
      audio = new Audio(selectedCurtain === carBehind ? CAR_SOUNDS[0] : GOAT_SOUNDS[0]);
    }
  
    if (hasSubmitted) {
      audio = new Audio(CROWD_SOUNDS);
    }
  
    if (audio) {
      audio.play();
    }
  }, [gameState, revealedCurtain, carBehind, currentRound, shouldPlayCrowdSound, hasSubmitted, selectedCurtain]);

  return <></>;
};

export default SoundManager;

