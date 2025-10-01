const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Give password as an argument")
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jyrgenhuhtala_db_user:${password}@testi2.aphxqro.mongodb.net/notesApp?retryWrites=true&w=majority&appName=testi2`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema(
    {
        content: String,
        important: Boolean
    })

const Note = mongoose.model('Note', noteSchema);

const note1 = new Note({
    content: "html is easy.",
    important: true
})
/*
const note = new Note({
    content: "Only way to go fast is to go slow.",
    important: true
})

const note = new Note({
    content: "CSS is hard",
    important: false
})

 */
/*
note.save()
    .then(result => {
        console.log("Note saved", result)
        mongoose.connection.close();
    })

 */

Note.find({ important:true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})