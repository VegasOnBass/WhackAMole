import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { increment, resetScore } from './redux/score.js';
import { isAmount } from './redux/highScore.js'
import { toggleScores } from './redux/showScores.js';

import './App.css';
import moleBonk from './sounds/moleBonk.wav'

function Game() {
    const [timeUp, setTimeUp] = useState(false)
    const [clockCount, setClockCount] = useState(30)    

    // Redux states
    const { highScore } = useSelector((state) => state.highScore)
    const { score } = useSelector((state) => state.score)
    const dispatch = useDispatch()

    const startButtonRef = useRef()
    const bonkFxRef = useRef(new Audio(moleBonk))

    const holes = ["hole1", "hole2", "hole3", "hole4", "hole5", "hole6"]

    let lastHole;
    let peepTimer
    let gameTimer


    useEffect(() => {
        if (score >= highScore) {
            dispatch(isAmount(score))
        }
    }, [score])


    const randomTime = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }

    const randomHole = () => {
        const holes = document.querySelectorAll('.hole');
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) {
            return randomHole(holes);
        }
        lastHole = hole;
        return hole;
    }

    const gameClock = () => {
        gameTimer = setInterval(() => {
            setClockCount(clockCount => clockCount - 1)
        }, 1000);

    }

    // Function to show mole
    const peep = () => {
        const time = randomTime(100, 1500);
        const hole = randomHole();
        hole.classList.add('up');
        peepTimer = setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) peep();
        }, time);

        
    }

    // Function to start game
    const startGame = () => {
        startButtonRef.current.style.opacity = "0"
        startButtonRef.current.disabled = true
        setClockCount(30)
        setTimeUp(false)
        dispatch(resetScore())
        gameClock()
        peep();
        setTimeout(() => {
            clearTimeout(peepTimer)
            clearInterval(gameTimer)
            startButtonRef.current.style.opacity = "initial"
            lastHole.classList.remove('up')
            dispatch(toggleScores(true))
        }, 30000)
    }


    // Function to count points
    const bonk = (e) => {
        const bonked = e.target
        if (!e.isTrusted) return; // cheater!
        bonkFxRef.current.play()
        dispatch(increment(5))
        bonked.parentNode.classList.remove('up');

    }

    return (
        <div>
            <h1>Whack-a-mole!</h1>
            <div className="container row center" >
                <p className="counter">
                    TIMER: {clockCount}
                </p>
                <button ref={startButtonRef} onClick={startGame} >Start!</button>
                <p className="counter">
                    SCORE: {score}
                </p>
            </div>
            <div className="game">
                {holes.map(hole => (
                    <div key={hole} className={`hole ${hole}`}>
                        <button className="mole" onClick={bonk}></button>
                    </div>
                )
                )}
            </div>
        </div>
    );
}

export default Game