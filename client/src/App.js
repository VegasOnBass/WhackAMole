import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toggleScores } from './redux/showScores.js';

import Game from './Game'
import LeaderBoard from './LeaderBoard';
import './App.css';



function App() {

  // Redux states
  const { highScore } = useSelector((state) => state.highScore)
  const { showScores } = useSelector((state) => state.showScores)

  const dispatch = useDispatch()

  return (
    <div className="App">
      <div className="container row center">
        <p className="counter">High Score: {highScore} </p>
        {showScores ? <button onClick={() => dispatch(toggleScores(false))}>Back to game</button> :
          <button onClick={() => dispatch(toggleScores(true))}>LeaderBoard</button>
        }
      </div>
      {showScores ? <LeaderBoard /> : <Game />}
    </div>
  );
}

export default App;
