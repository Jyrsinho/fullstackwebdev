import {useEffect, useState} from 'react'
import Note from "./components/Note.jsx";
import AddNote from "./components/AddNote.jsx";
import Footer from "./components/Footer.jsx";
import noteService from "./services/notes.js";
import Notification from "./components/Notification.jsx";


function App(props) {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState("a new note");
    const [showAll, setShowAll] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('effect');
        noteService.
        getAll()
            .then(initialNotes=> {
                console.log('promise fulfilled');
                setNotes(initialNotes);
            })
        },[])
    console.log(`render ${notes.length} notes`);

    const handleSubmit= (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
            id: String(notes.length + 1)
        }
        noteService.create(noteObject)
            .then(createdNote => {
                setNotes(notes.concat(createdNote));
                setNewNote("")
            })
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find((note) => note.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService.update(id, changedNote)
            .then(changedNote=> {
                setNotes(notes.map((note) => (note.id !== id) ? note : changedNote));
            })
            .catch(e => {
                setError(`The note with id ${id} was already deleted from the server`);
                setTimeout(() => {
                    setError(null);
                }, 500);
                setNotes(notes.filter((note) => (note.id !== id)));
            })
    }

    // newNote muuttujan käsittely on sidottu tähän tapahtumankäsittelijään
    // aina kun formin input kenttä muuttuu muutetaan myös newNote-muuttujan arvoa
    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportanceOf={toggleImportanceOf} />
                )}
            </ul>
            <Notification error={error}></Notification>
            <AddNote onChange={handleNoteChange} onSubmit = {handleSubmit} input_value={newNote}/>
            <Footer></Footer>
        </div>
    )
}

export default App
