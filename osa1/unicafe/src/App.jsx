// noinspection JSCheckFunctionSignatures

import {useState} from 'react'

const Button = ({onclick, text}) => {
    return (
        <button onClick={onclick}>{text}</button>
    )
}

const StatisticsRow = ({text, value}) => {
    return (
        <tr key={text}>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Table = ({state}) => {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                {Object.entries(state).map(([key, value]) => (
                    <StatisticsRow key= {key} text={key} value={value} />
                ))}
                </tbody>
            </table>
        </>
    )
}

const Statistics = ({state}) => {
    if (state.all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    } else {
        return (
            <div>
                <h2>statistics</h2>
                <Table state={state}/>
            </div>
        )
    }
}

const App = () => {
    const [state, setState] = useState({
        good: 0,
        bad: 0,
        neutral: 0,
        all: 0,
        average: 0,
        positive: 0
    })

    const handleButton = (updated) => {
        return () => {
            setState((prevState) => {
                const newState = {
                    ...prevState,
                    [updated]: prevState[updated] + 1,
                    all: prevState.all + 1,
                };
                newState.average = (newState.good - newState.bad) / newState.all;
                newState.positive = (newState.good / newState.all) * 100;
                return newState;

            });
        };
    };

    return (
        <div>
            <h2>Give feedback</h2>
            <Button onclick={handleButton("good")} text="Good" />
            <Button onclick={handleButton("bad")} text="Bad" />
            <Button onclick={handleButton("neutral")} text= "neutral" />
            <Statistics state={state} />
        </div>
  )
}

export default App
