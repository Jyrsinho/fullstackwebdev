import Header from "./Header.jsx";
import Content from "./Content.jsx";

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

export default Course;