

const Hello =(props) => {
    console.log(props)
    return (
       <p>Hello {props.name} you are {props.age} old.</p>
    )
}

const App = () => {
    const nimi = "Pekka";
    const ika = 10;

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Kalle" age={10}/>
            <Hello name="Jozia" age={32} />
            <Hello name= {nimi} age={ika}/>
        </>
    )
}


export default App