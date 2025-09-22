const Form = ({newName, changeName, setNewName, newNumber, setNewNumber, handleSubmit, changeNumber, error}) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={changeName}
                             onFocus={() => setNewName('')}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={changeNumber}
                               onFocus={() => setNewNumber('')}/>
            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
            <p>{error}</p>
        </form>
    )
}

export default Form