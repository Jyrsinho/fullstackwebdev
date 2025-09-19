import {useState} from 'react'

const Button = ({onclick, text}) => <button onClick={onclick}>{text}</button>

const Display = ({value}) => {
    return (
        <p>value: {value}</p>
    )
}

const App = (props) => {
    const [value, setValue] = useState(0)

    // Tämä on funktio tehdas. Sitä kutsutaan antamalla parametri jonka mukaan tehdas sitten luo ja
    // ennen kaikkea PALAUTTAA FUNKTION

    return (
        <div>
            <div>
                <Display value={value} />
                <Button onclick={ () => setValue(1000)} text={1000}/>
                <Button onclick={ () => setValue(0)} text={"reset"}/>
                <Button onclick={ () => setValue(value + 1)} text={"increment"}/>
            </div>
        </div>
    )
}

export default App