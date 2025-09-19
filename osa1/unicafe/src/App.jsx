import {useState} from 'react'

const Button = ({onclick, text}) => {
    return (
        <button onClick={onclick}>{text}</button>
    )
}

const Display = ({good, bad, neutral, all}) => {
    return (
        <div>
            <h2>statistics</h2>
            <p>good {good}</p>
            <p>bad {bad}</p>
            <p>neutral {neutral}</p>
            <p>all {all}</p>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [bad, setBad] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [all, setAll] = useState(0);


    const handleButton = (func) => {

        return () => {
            func(previous => previous + 1);
            setAll(all + 1);
        }
    }

    return (
        <div>
            <h2>Give feedback</h2>
            <Button onclick={handleButton(setGood)} text="Good" />
            <Button onclick={handleButton(setBad)} text="Bad" />
            <Button onclick={handleButton(setNeutral)} text= "neutral" />
            <Display
                good={good}
                bad={bad}
                neutral={neutral}
                all={all}
            ></Display>
        </div>
  )
}

export default App
