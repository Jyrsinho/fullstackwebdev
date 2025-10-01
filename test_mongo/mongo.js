const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Give password as an argument")
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
`mongodb+srv://jyrgenhuhtala_db_user:${password}@testi2.aphxqro.mongodb.net/?retryWrites=true&w=majority&appName=testi2`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema(
    {
        content: "Html is easy",
        important: true,
    })

note.save()
    .then(result => {
        console.log("Note saved")
        mongoose.connection.close();
    })
