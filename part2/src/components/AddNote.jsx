
const AddNote = ({onChange, onSubmit, input_value})=> {
    return (
        <form  onSubmit={onSubmit}>
            <input onChange={onChange} value={input_value}/>
            <button type="submit">Add Note</button>
        </form>
    )
}

export default AddNote;