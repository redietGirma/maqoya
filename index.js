const parents = require('./routes/parents')
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-Objectid')(Joi);
const bodyParser = require('body-parser');
const router = require('./routes/parents.js');
const app= express();

  mongoose.connect('mongodb://localhost/Maqoya',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=> console.log('connected to mongodb!!'))
.catch(err => console.log('could not connect to mongodb', err));

// app.use(express.json());
app.use('/api/parents', parents);

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(router);
router.use(bodyParser.json());
const port = process.env.PORT || 4449
app.listen(port, () => console.log(`connected to port ${port}..`))
  






// const parentSchema = mongoose.Schema({
//     First_name: {type:String, required: true},
//     Last_name: {type: String, required:true},
//     username: {type:String, required:true},
//     email: {type: String, required: true},
//     phoneNumber: {type: Number, required: true},
//         date: {type: Date, default: Date.now}
// })
// const Parent = mongoose.model('Parent', parentSchema);

// async function createParent(){
//   const parent = new Parent({
//     First_name: 'Rediet',
//     Last_name: 'Girma',
//     username: 'rediG',
//     email: 'redi@gmail.com',
//     phoneNumber: '+251913904513'

//   })
//    const result = await parent.save();
//    console.log(result);
// }
// createParent();


