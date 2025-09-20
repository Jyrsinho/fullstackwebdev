import { useState } from 'react'
import Note from "./components/Note.jsx";
import AddNote from "./components/AddNote.jsx";


function App(props) {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState("a new note");
    const [showAll, setShowAll] = useState(true);

    notes.map(note => <li>{note.content}</li>)

    const handleSubmit= (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
            id: String(notes.length + 1)
        }
        setNotes(notes.concat(noteObject));
        setNewNote('')
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
                    <Note key={note.id} note={note.content} />
                )}
            </ul>
            <AddNote onChange={handleNoteChange} onSubmit = {handleSubmit} input_value={newNote}/>
        </div>
    )
}

export default App
