const express = require('express');
const connectToMongo = require('./db');
connectToMongo();

const app = express()
const port = 5000

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook backend listening at http://localhost:${port}`)
})


