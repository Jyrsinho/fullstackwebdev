const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Give password as an argument")
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jyrgenhuhtala_db_user:${password}@testi2.aphxqro.mongodb.net/phonebook?retryWrites=true&w=majority&appName=testi2`

mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = new mongoose.Schema(
    {
        name: String,
        number: String
    })

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
    console.log("User gave password as an argument")
    console.log("We should show all the phoneNumbers in the DB")
    showAllPersons()
}

if (process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]
    addPersonToDB(name, number)
        
}


function addPersonToDB() {
    console.log("The user has given more than 3 parameters, there is a person to add")
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    person.save().then(result => {
        console.log("Person added successfully")
        mongoose.connection.close()
    }).catch(err => console.log(err));
}


function showAllPersons() {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}