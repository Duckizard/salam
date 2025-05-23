import { useState } from 'react';
import { Howl } from 'howler';

export const useSound = () => {
  const [sound, setSound] = useState(true);

  const sounds = {
    towerPlace: new Howl({ src: ['/sounds/place.mp3'] }),
    enemyDeath: new Howl({ src: ['/sounds/hit.mp3'] }),
    gameOver: new Howl({ src: ['/sounds/lose.mp3'] }),
    victory: new Howl({ src: ['/sounds/win.mp3'] })
  };

  const toggleSound = () => setSound(!sound);

  return { sound, toggleSound, sounds };
};