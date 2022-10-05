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
            const response = await fetch(`http://localhost:5000/scores/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setScores(records);
            setScores([...records, { name: name, score: score }])
        }

        getScores()
    }, [])

    scoresOrdered = [...scores].sort((a, b) => b.score - a.score)


    // Function to ssubmit scores
    async function submitScore(e) {
        e.preventDefault();

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

    const handleChange = (text) => {
        setName(text.target.value)
        console.log(name)
    }

    return (
        <div>
            <h1>LeaderBoard</h1>
            <br />
            <br />
            <div className="board">
                {scoresOrdered.slice(0, 10).map((score) => {
                    const key = nanoid()

                    if (score.name === '') {
                        return (
                            <li className="row" key={key}>
                                <div className="leader left">{i++}</div>
                                <form className="leader middle">
                                    <input type="text" onChange={handleChange} />
                                    <button type="submit" onClick={submitScore}>Submit</button>
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
