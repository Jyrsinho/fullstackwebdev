import { useState } from 'react'
import {useEffect} from "react";
import axios from "axios";
import Form from './components/Form.jsx'
import PersonList from './components/PersonList.jsx'
import Filter from './components/Filter.jsx'

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
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('write new name here');
    const [newNumber, setNewNumber] = useState('');
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        console.log("Efect begins")
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                console.log("Promise fulfilled")
                setPersons(response.data);
            })
    }, [])
    console.log('render', persons);

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
            <PersonList persons={persons} filter={filter} />
        </div>
    )
}

export default App