require('dotenv').config();
const express = require('express');
const app = express();
const Note = require('./models/note.js');

app.use(express.static('dist'));
app.use(express.json());

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger);

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    });
})


app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


app.post('/api/notes', (request, response, next) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save()
        .then(savedNote => {
            response.json(savedNote)
    })
    .catch(error => next(error))
})


app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body;

    Note.findById(request.params.id)
        .then(note => {
            if (!note) {
                return response.status(404).end()
            }
            note.content = content
            note.important = important

            return note.save().then(savedNote => {
                response.json(savedNote)
            })
        }).catch(error => next(error))
})


app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})


const Port = process.env.PORT || 3001;
app.listen(Port)
console.log(`Server running on port ${Port}`)


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(unknownEndpoint)
app.use(errorHandler)