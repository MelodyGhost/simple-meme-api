const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const db = require('mongoose');
const memeRoute = require('./routes/memeRoute');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10kb' }));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Meme Route
app.use('/', memeRoute);

//DataBase
let uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@mg.x26qm.mongodb.net/meme-api?retryWrites=true&w=majority`;

db.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('ERROR connecting to database' + '\n' + err));

// Starting Server
app.listen(process.env.PORT, () =>
  console.log('listening on port ' + process.env.PORT)
);
