const Notifications = ({notification}) => {
    if (notification) {
        return (
            <div>
                <p>{notification}</p>
            </div>
        )
    }
}

export default Notifications