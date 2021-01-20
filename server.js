import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import images from './controllers/image.js';
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL, // this number represents localhost aka home
        ssl: true,
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { images.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { images.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running ON PORT ${process.env.PORT}`);
})