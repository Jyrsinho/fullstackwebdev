const Notification = ({submissionStatus}) => {

    const errorStyle = {
        display: 'block',
        border: '1px solid black',
        color: 'red',
        fontStyle: 'italic'
    }

    const successStyle = {
        display: 'block',
        border: '1px solid black',
        color: 'green',
        fontStyle: 'bold'
    }

    if (submissionStatus == null) return null;

    const chosenStyle = (submissionStatus.code=== 0) ? successStyle : errorStyle;

    return (
        <div style={chosenStyle}>
            {submissionStatus.message}
        </div>
    )
}

export default Notification