const Total = ({parts}) => {
    console.log(parts)
    const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);

    return (
        <>
            <p><strong>Number of exercises {total}</strong> </p>
        </>
    )
}

export default Total