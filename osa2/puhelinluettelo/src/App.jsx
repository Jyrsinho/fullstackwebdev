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

        if (newError.code === 3) {
            if (window.confirm("This name already exists. Replace old number?")) {
                console.log("Now we should go and set new number to person")
                const personToUpdate = persons.find( (person) => person.name.trim().toLowerCase() === newName.trim().toLowerCase())
                const updatedPerson = {
                    ...personToUpdate,
                    number: newNumber,
                }

                // annetaan personservicelle id ja sanotaan että tunge sinne tämä uusi numero
                personService.update(updatedPerson.id, updatedPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
                        setNewName('');
                        setNewNumber('');
                    })

            } else{
                setError(newError.message);
            }
        }
        else if (newError.code === 0) {
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
         else  {
            setError(newError.message);
        }
    }

    const deletePerson = personId => {
        {if (window.confirm('Are you sure you want to delete this person?')) {
            console.log(`We should now delete person with id ${personId}`);
            personService.remove(personId)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== personId))
                })
        } else {
        console.log("Glad you didnt want to delete that person.")}
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
            <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
        </div>
    )
}

export default App