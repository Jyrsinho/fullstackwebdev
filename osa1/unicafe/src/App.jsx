import {useState} from 'react'

const Button = ({onclick, text}) => {
    return (
        <button onClick={onclick}>{text}</button>
    )
}

const Display = ({good, bad, neutral, all, average, positive}) => {
    return (
        <div>
            <h2>statistics</h2>
            <p>good {good}</p>
            <p>bad {bad}</p>
            <p>neutral {neutral}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {positive}</p>
        </div>
    )
}

const App = () => {
    const [state, setState] = useState({good: 0, bad: 0, neutral: 0, all: 0, average: 0, positive: 0})

    const handleButton = (updated) => {
        return () => {
            console.log(updated);
            console.log(state[updated]);
            console.log("state before: ",state);
            // laskenta pitää tehdä newState muuttujassa koska state ei ehdi muuttua renderöintiä varten

            // tehdään shallow copy state muuttujasta
            const newState = {...state};
            newState[updated] = state[updated] + 1;
            newState["all"] = state["all"] + 1;
            newState["average"] = ( newState["good"] - newState["bad"] ) / newState['all'];
            newState["positive"] = newState["good"] / newState['all'];
            console.log("updated state", newState);

            setState(newState);
        }
    }

    return (
        <div>
            <h2>Give feedback</h2>
            <Button onclick={handleButton("good")} text="Good" />
            <Button onclick={handleButton("bad")} text="Bad" />
            <Button onclick={handleButton("neutral")} text= "neutral" />
            <Display
                good={state.good}
                bad={state.bad}
                neutral={state.neutral}
                all={state.all}
                average = {state.average}
                positive = {state.positive}
            ></Display>
        </div>
  )
}

export default App
