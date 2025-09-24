const Notification = ({submissionStatus}) => {

    const errorStyle = {
        color: 'red',
        fontStyle: 'italic'
    }

    const successStyle = {
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