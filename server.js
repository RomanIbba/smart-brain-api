import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
// import hanldeImage from './controllers/image.js';
// import handleApiCall from './controllers/image.js';
import images from './controllers/image.js';
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', // this number represents localhost aka home
        user: 'postgres',
        password: 'Theman1231',
        database: 'smart-brain'
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

app.listen(3000, () => {
    console.log('app is running');
})

/*
/ --> res = this is working
/signin --> POST = success/ fail
/register --> POST = user
/profile:userId --> GET = user
/image --> PUT --> user

*/