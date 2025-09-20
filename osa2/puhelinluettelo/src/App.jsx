import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('write new name here')

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const names = persons.map((person) => person.name.toLowerCase());
        console.log(names);

        if (newName.trim() === '') {
            alert('New name cannot be empty string');

        } else if (names.includes(newName.toLowerCase())){
            alert(`${newName} already exist`);

        }else {
            const newPerson = {
                name: newName
            }
            setPersons(persons.concat([newPerson]))
            setNewName('');
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input value={newName} onChange={handleChange} onFocus={() => setNewName('')} />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person =>
                <li key={person.name}>{person.name}</li>)}
            </ul>

        </div>
    )

}

export default App