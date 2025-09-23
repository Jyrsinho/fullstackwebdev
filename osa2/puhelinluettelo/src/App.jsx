import { useState } from 'react'
import {useEffect} from "react";
import personService from "./services/persons.js";
import validateForm from  "./services/formValidator.js";

import Form from './components/Form.jsx'
import PersonList from './components/PersonList.jsx'
import Filter from './components/Filter.jsx'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('write new name here');
    const [newNumber, setNewNumber] = useState('');
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        personService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            })
    }, [])

    const createOnChangeHandler = (setter) => (e) => setter(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        const newError = validateForm(newName, persons, newNumber);
        setError(newError);

        if (newError === null) {
            const newPerson = {
                name: newName.trim(),
                number: newNumber,
            }
            personService.create(newPerson)
                .then(newPerson => {
                    setPersons(persons.concat([newPerson]))
                    setNewName('');
                    setNewNumber('');
                })
        }
    }

    const deletePerson = personId => {
        console.log(`We should now delete person with id ${personId}`);
        personService.remove(personId)
            .then(() => {
                setPersons(persons.filter((person) => person.id !== personId))
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter setFilter={setFilter} />
            <Form
                newName={newName}
                changeName={createOnChangeHandler(setNewName)}
                changeNumber={createOnChangeHandler(setNewNumber)}
                setNewName={setNewName}
                handleSubmit={handleSubmit}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                error={error}>
            </Form>
            <h2>Numbers</h2>
            <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
        </div>
    )
}

export default App