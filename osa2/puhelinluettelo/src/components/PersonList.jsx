
const PersonList = ({persons, filter}) => {

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    return (
        <ul>
            {filteredPersons.map(person =>
                <li key={person.name}>{person.name}: {person.number}</li>)}
        </ul>
    )
}

export default PersonList