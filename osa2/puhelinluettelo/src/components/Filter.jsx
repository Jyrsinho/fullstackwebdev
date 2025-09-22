const Filter = ({ setFilter}) => {
    return (
        <div>
            filter:
            <input
            onChange={(e) => {setFilter(e.target.value)}}>
            </input>
        </div>
    )
}


export default Filter