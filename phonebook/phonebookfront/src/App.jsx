import { useState } from 'react'
import {useEffect} from "react";
import personService from "./services/persons.js";
import validateForm from "./services/formValidator.js";

import Form from './components/Form.jsx'
import Notification from "./components/Notification.jsx"
import PersonList from './components/PersonList.jsx'
import Filter from './components/Filter.jsx'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('write new name here');
    const [newNumber, setNewNumber] = useState('');
    const [submissionStatus, setsubmissionStatus] = useState(null);
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

        const newSubmissionStatus = validateForm(newName, persons, newNumber);

        if (newSubmissionStatus.code === 3) {
            if (window.confirm("This name already exists. Replace old number?")) {
                const personToUpdate = persons.find( (person) => person.name.trim().toLowerCase() === newName.trim().toLowerCase())
                const updatedPerson = {
                    ...personToUpdate,
                    number: newNumber,
                }
                personService.update(updatedPerson.id, updatedPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person));
                        setNewName('');
                        setNewNumber('');
                        setsubmissionStatus({
                            code: 0,
                            message: `succesfully updated ${updatedPerson.name}`
                        })
                    }).catch(error => {
                        console.log(error);
                        setsubmissionStatus({
                            code: 4,
                            message: `Information of ${updatedPerson.name} has already been deleted.`
                        })
                })}
        } else if (newSubmissionStatus.code === 0) {
            const newPerson = {
                name: newName.trim(),
                number: newNumber,
            }
            personService.create(newPerson)
                .then(newPerson => {
                    setPersons(persons.concat([newPerson]))
                    setNewName('');
                    setNewNumber('');
                    setsubmissionStatus({
                        message: `Succesfully created ${newPerson.name} ${newPerson.number}`,
                        code: 0
                    })
                })
        } else  {
            setsubmissionStatus(newSubmissionStatus);
        }
    }

    const deletePerson = personId => {
        {if (window.confirm('Are you sure you want to delete this person?')) {
            personService.remove(personId)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== personId))
                })
        } else {
        }}}

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
                setNewNumber={setNewNumber}>
            </Form>
            <Notification submissionStatus={submissionStatus} />
            <h2>Numbers</h2>
            <PersonList persons={persons} filter={filter} deletePerson={deletePerson} />
        </div>
    )
}

export default App