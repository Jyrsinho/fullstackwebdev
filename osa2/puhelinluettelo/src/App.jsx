import { useState } from 'react'

/**
 * Validates the given form inputs and returns possible error. If there is no error,
 * returns null.
 * @param newName
 * @param persons
 * @param newNumber
 */
function validateForm(newName, persons, newNumber) {
    let error = isValidName(newName, persons);
    if (error !== null) return error;
    error = isValidNumber(newNumber)
    if (error !== null) return error;
    return error;

}

function isValidName(newName, persons) {
    const names = persons.map(person => person.name.toLowerCase());

    if (newName === "write new name here") {
        return("Add a new name, please");

    }

    if (newName.trim() === '') {
        return ('New name cannot be empty string');
    }

    if (names.includes(newName.trim().toLowerCase())) {
        return (`${newName} already exist`);
    }

    return null;
}

function isValidNumber(newNumber ) {
    if (newNumber.trim().length < 1) {
        return("Number cannot be empty")
    }

    const allowed = /^[0-9 -]/;
    if (!allowed.test(newNumber)) {
        return ("Invalid number");
    }

    return null;



}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('write new name here');
    const [newNumber, setNewNumber] = useState('');
    const [error, setError] = useState(null);

    const createOnChangeHandler = (setter) => (e) => setter(e.target.value)


    const handleSubmit = (e) => {
        e.preventDefault();

        const newError = validateForm(newName, persons, newNumber);
        setError(newError);
        console.log("error", newError);

        if (newError === null) {
            const newPerson = {
                name: newName.trim(),
                number: newNumber,
            }
            setPersons(persons.concat([newPerson]))
            setNewName('');
            setNewNumber('');
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Form
                newName={newName}
                changeName={createOnChangeHandler(setNewName)}
                changeNumber={createOnChangeHandler(setNewNumber)}
                setNewName={setNewName}
                handleSubmit={handleSubmit}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                error={error}
            />
            <h2>Numbers</h2>
            <ul>
                {persons.map(person =>
                <li key={person.name}>{person.name}: {person.number}</li>)}
            </ul>

        </div>
    )
}

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

export default App