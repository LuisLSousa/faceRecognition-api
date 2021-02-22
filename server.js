const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');
const profile = require('./controllers/profile.js');

const db = knex({
    client: 'pg',
    connection: {   
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const app = express();

app.use(express.json()); // equivalent to bodyParser
app.use(cors());

app.get('/', (req, res) => { res.send('success') })

app.get('/profile/:id', profile.handleProfileGet(db)) // dependency injection

app.post('/signin', signin.handleSignIn(db, bcrypt)) // same as (req, res) => { siginIn.handleSignIn(req, res, db, bcrypt) }

app.post('/register/', register.handleRegister(db, bcrypt)) 

app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => { console.log(`app is running on port ${process.env.PORT}`) })

