const Header = (props) => {
    return (
        <div id="header">
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log(`Content props.parts: ${props.parts}`);
    const parts = props.parts;
    return (
        <div id="content">
            <Part content={parts[0].name} amount={parts[0].exercises} />
            <Part content={parts[1].name} amount={parts[1].exercises} />
            <Part content={parts[2].name} amount={parts[1].exercises} />
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.content} {props.amount}</p>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.total} </p>
        </>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
        </div>
    )
}

export default App