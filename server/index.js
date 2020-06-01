const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const db = require('./config/key').MongoURI;

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json());

app.use(cors());

app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(__dirname + '/public'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`));