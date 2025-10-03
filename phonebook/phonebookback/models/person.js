const mongoose = require('mongoose');
const {mongo} = require("mongoose");

const password = process.argv[2];
const dbName = "phonebook";
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

console.log('connecting to db...')
mongoose.connect(url)
    .then(() => console.log('Connected to db...'))
    .catch(err => {
        console.log(`failed to connect to db ${err}`);
    })


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform:  (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }})

module.exports = mongoose.model('Person', personSchema);
