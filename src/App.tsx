import React, { useEffect, useRef, useState } from 'react';
import Grid from './grid/Grid';

const App = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [position, setPosition] = useState([0, 0]);
  const [key, setKey] = useState('');
  const [tail, setTail] = useState([
    [-2, 7],
    [-1, 7],
  ]);
  const [apple, setApple] = useState([4, 3]);
  const [tick, setTick] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const ticking = () => {
    setTimeout(() => {
      setTick(!tick);
    }, 100);
  };

  useEffect(() => {
    snakeMovement();
    ticking();
  }, [tick]);

  const currentKey = useRef('');

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowRight' && currentKey.current !== 'ArrowLeft') ||
        (event.key === 'ArrowLeft' && currentKey.current !== 'ArrowRight') ||
        (event.key === 'ArrowUp' && currentKey.current !== 'ArrowDown') ||
        (event.key === 'ArrowDown' && currentKey.current !== 'ArrowUp')
      ) {
        setKey(event.key);
        currentKey.current = event.key;
      }
    });
  }, []);

  const goTroughWalls = () => {
    if (positionY > 19) {
      setPositionY(0);
    } else if (positionY < 0) {
      setPositionY(19);
    } else if (positionX > 19) {
      setPositionX(0);
    } else if (positionX < 0) {
      setPositionX(19);
    }
  };

  const tailFollowsHead = () => {
    const tailArr = [...tail];
    tailArr.unshift(position);
    tailArr.pop();
    setTail([...tailArr]);
  };

  const snakeMovement = () => {
    if (key === 'ArrowRight') {
      setPositionX(positionX + 1);
    } else if (key === 'ArrowLeft') {
      setPositionX(positionX - 1);
    } else if (key === 'ArrowUp') {
      setPositionY(positionY - 1);
    } else if (key === 'ArrowDown') {
      setPositionY(positionY + 1);
    }

    goTroughWalls();
  };

  useEffect(() => {
    snakeMovement();
  }, [key]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setPosition([positionX, positionY]);
    tailFollowsHead();
    eatApple();
    eatsTail();
  }, [positionX, positionY]);

  const eatsTail = () => {
    if (JSON.stringify(tail).includes(JSON.stringify(position))) {
      console.log('Auch');
      setTail([
        [-1, 0],
        [-2, 0],
      ]);
      setPosition([-5, 0]);
      setIsGameRunning(!isGameRunning);
      setKey('');
    }
  };

  const getRandomNum = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const tailCantBeApple = () => {
    let numArr = [getRandomNum(19), getRandomNum(19)];
    while (
      JSON.stringify(tail).includes(JSON.stringify(numArr)) ||
      JSON.stringify(position) === JSON.stringify(numArr)
    ) {
      numArr = [getRandomNum(19), getRandomNum(19)];
    }
    setApple(numArr);
  };

  const eatApple = () => {
    if (JSON.stringify(position) === JSON.stringify(apple)) {
      tailCantBeApple();
      const newTail = [...tail];
      newTail.unshift(position);
      setTail(newTail);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Snake</h1>

      {isGameRunning ? (
        <>
          <div>Press arrow to start</div>
          <Grid apple={apple} tail={tail} position={position} />
        </>
      ) : (
        <button onClick={() => setIsGameRunning(!isGameRunning)}>Play</button>
      )}
    </div>
  );
};
export default App;
