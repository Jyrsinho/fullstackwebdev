import { useState } from 'react'

const Button = ({onclick, text}) => {
    return (
        <button onClick={onclick}>{text}</button>
    )
}

const Display = ({good, bad, neutral}) => {
    return (
        <div>
            <h2>statistics</h2>
            <p>good {good}</p>
            <p>bad {bad}</p>
            <p>neutral {neutral}</p>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [bad, setBad] = useState(0);
    const [neutral, setNeutral] = useState(0);

    const handleButton = (func, value) => {
        return () => {
            func(value + 1);
        }
    }

    return (
        <div>
            <h2>Give feedback</h2>
            <Button onclick={handleButton(setGood, good)} text="Good" />
            <Button onclick={handleButton(setBad, bad)} text="Bad" />
            <Button onclick={handleButton(setNeutral, neutral)} text= "neutral" />
            <Display good={good} bad={bad} neutral={neutral} />
        </div>
  )
}

export default App
