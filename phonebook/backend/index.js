require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require("./models/person.js");


app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - body=:body'));

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: "malformatted id"});
    }

    next(error)
}

app.use(requestLogger);


app.get('/api/phoneNumbers', (req, res, next) => {
    Person.find({})
        .then((people) => {
            res.json(people);
    })
        .catch((error) => {next(error)})
})


app.get('/api/phoneNumbers/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
    .then((person) => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end()
        }
    })
        .catch((error) => {
            next(error)
        })
})


app.get('/api/info', (req, res) => {
    Person.find({})
        .then((people) => {
            const info = `
    <div>
        <p>Phonebook has info for ${people.length} people.</p>
        <p>${new Date()}</p>
    </div>
    `;
            res.send(info);
        })
})


app.post("/api/phoneNumbers", (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).send('Content is missing');
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    console.log("Creating new person to DB", person)
    person.save()
        .then(savedperson=> {
            console.log('person saved!')
            response.json(savedperson);
    })
    .catch((error) => {next(error)})
})


app.put("/api/phoneNumbers/:id", (request, response, next) => {
    const {name, number} = request.body;
    const id = request.params.id;
    Person.findById(id)
    .then((person) => {
        if (person) {
            console.log("modified person", person)
            person.name = name;
            person.number = number;
            console.log("Person updated!", person);

            return person.save()
                .then(savedperson=> {
                    response.json(savedperson);
            })
        } else {
            return response.status(404).send({error: "person not found"});
        }
    }).catch((error) => {next(error)})
})


app.delete('/api/phoneNumbers/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id)
    .then(result=> {
        if (result) {
            console.log("Removed succesfully", result)
        } else {
            console.log("No such ID in DB", result)
        }
        response.status(204).end()
    })
        .catch(error => next(error));
})


const unknownEndPoint = (request, response) => {
    response.status(404).send('unknown endpoint');
}



app.use(errorHandler);

app.use(unknownEndPoint);

const Port = process.env.PORT || 3001;
app.listen(Port)
console.log("Listening on port " + Port);
