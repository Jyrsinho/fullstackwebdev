
const PersonList = ({persons, filter}) => {
    console.log("filter", filter)
    console.log("PersonList before filter", persons)

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    {console.log("PersonList After filter", filteredPersons) }
    return (
        <ul>
            {filteredPersons.map(person =>
                <li key={person.name}>{person.name}: {person.number}</li>)}
        </ul>
    )
}

export default PersonList