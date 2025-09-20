import Part from "./Part.jsx";
import Total from "./Total.jsx";

const Content = ({parts}) => {
    return (
        <div id="content">
            {parts.map((item) =>
                <Part key={item.name} content ={item.name} amount={item.exercises}/>
            )}
            <Total parts={parts} />
        </div>
    )
}

export default Content;