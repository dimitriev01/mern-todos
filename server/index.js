require("dotenv").config();
const config = require('./config/db.config')
const express = require('express');
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose');

const app = express();

const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(express.json({extended:true}))

app.use(cors(corsConfig))

app.use('/api/user', require('./routes/user'))
app.use('/api/todo', require('./routes/todo'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.DB_PORT || 5000;

const start = async () => {
    try {
        await mongoose.connect(config.url)
        app.listen(PORT, ()=> console.log(`Application has been started on port ${PORT}...`))
    } catch (e) {
        console.log(e.message);
        process.exit(1)
    }
}

start()