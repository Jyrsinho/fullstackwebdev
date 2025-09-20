const Header = (props) => {
    return (
        <div id="header">
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = ({parts}) => {
    return (
        <div id="content">
            {parts.map((item) =>
                <Part key={item.name} content ={item.name} amount={item.exercises}/>
            )}
        </div>
    )
}

const Part = ({content, amount}) => {
    return (
        <p>{content} {amount}</p>
    )
}

const Total = ({parts}) => {
    console.log(parts)
    const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);

    return (
        <>
            <p><strong>Number of exercises {total}</strong> </p>
        </>
    )
}


const App = () => {
    const courses =
        [   {
            name: 'Half Stack application development',
            id: 1,
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
            ],
        },
            {
            name: "Node.js",
            id:2,
            parts: [
                    {
                        name: "Routing",
                        exercises: 3,
                        id:1
                    },
                    {
                        name: 'Middlewares',
                        exercises: 7,
                        id:2
                    }
                ]
        }
        ]

    return (
        <div>
            <Courses courses={courses} />
            <Total courses= {courses} />
        </div>
    )
}

const Courses = ({courses}) =>{
    return (
        <div>
            {courses.map(course =>
                    <Course key={course.id} course={course}/>
            )}
        </div>
    )
}

const Course = ({course}) => {
    const name = course.name;
    const parts = course.parts;

    return (
        <div>
            <Header course={name}/>
            <Content parts={parts} />
        </div>
    )

}

export default App