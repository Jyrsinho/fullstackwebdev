
const PersonList = ({persons, filter, deletePerson}) => {

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    return (
        <ul>
            {filteredPersons.map(person =>
                <li
                    key={person.name}>{person.name}: {person.number}
                    <button onClick={() => deletePerson(person.id)} >delete person</button>
                </li>)}
        </ul>
    )
}

export default PersonList