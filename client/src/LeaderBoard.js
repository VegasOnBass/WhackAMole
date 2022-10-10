import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { resetScore } from './redux/score.js';

import { nanoid } from "nanoid";

function LeaderBoard() {
    const [scores, setScores] = useState([])
    const [name, setName] = useState('')

    const { score } = useSelector((state) => state.score)
    const dispatch = useDispatch()

    let scoresOrdered
    let i = 1

    useEffect(() => {
        // Function to get scores
        async function getScores() {
            const response = await fetch(`https://whack-a-mole-app.herokuapp.com/scores`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setScores(records);
            setScores([...records, { id:'player', score: score }])
            
        }

        getScores()
    }, [])

    scoresOrdered = [...scores].sort((a, b) => b.score - a.score)

    const handleChange = (text) => {
        setName(text.target.value)
        console.log(name)
    }
    
    // Function to ssubmit scores
    async function submitScore(event) {
        event.preventDefault();

        const highScore = { name: name, score: score }

        const response = await fetch(`http://localhost:5000/scores/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(highScore)
        });

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        dispatch(resetScore())
        window.location.reload()


    }


    return (
        <div>
            <h1>Leaderboard</h1>
            <br />
            <br />
            <div className="board">
                {scoresOrdered.slice(0, 10).map((score) => {
                    const key = nanoid()

                    if (score.id === 'player') {
                        return (
                            <li className="row" key={score.id}>
                                <div className="leader left">{i++}</div>
                                <form className="leader middle" onSubmit={submitScore}>
                                    <input type="text" onChange={handleChange} />
                                    <input className="button" type="submit" value="Submit" />
                                </form>
                                <span className="leader right">{score.score}</span>
                            </li>
                        )
                    }

                    return (
                        <li className="row" key={key}>
                            <div className="leader left">{i++}</div>
                            <div className="leader middle">{score.name}</div>
                            <span className="leader right">{score.score}</span>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

export default LeaderBoard
