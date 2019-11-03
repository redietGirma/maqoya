const dotenv = require('dotenv').config();
const config = require('./config');
const parents = require('./routes/parents')
const child = require('./routes/child');
const daycare = require('./routes/daycares');
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-Objectid')(Joi);
const bodyParser = require('body-parser');
const router = require('./routes/parents.js');
const app= express();
const auth = require('./routes/auth');
const passportSetup = require('./config/passport-setup');

if(!config.jwtPrivateKey){
  console.log('ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

  mongoose.connect('mongodb://localhost/Maqoya',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=> console.log('connected to mongodb!!'))
.catch(err => console.log('could not connect to mongodb', err));

// app.use(express.json());

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

app.use('/api/parents/register', parents);
app.use('/api/parents',auth);
app.use('/api/child', child);
app.use('/api/daycare/register', daycare);
router.use(bodyParser.json());


app.use((req, res, next) => {
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
});

const port = process.env.PORT || 4449
app.listen(port, () => console.log(`connected to port ${port}..`))



