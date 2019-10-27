const {validate,Parent} = require('../models/parents');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');


// new parent registration route
router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    let parent = await Parent.findOne({phoneNumber:req.body.phoneNumber});
    if (parent)  return res.status(400).json('user already exisits!');

       // Insert the new parent if they do not exist yet
        parent = new Parent (req.body); 
        const salt =  await bcrypt.genSalt(10);
        parent.password = await bcrypt.hash(parent.password, salt);
        await parent.save();
        res.send(_.pick(parent,['id','first_name','last_name','username','email','phoneNumber']));
 });


 module.exports = router;


// router.get('/:id', (req,res)=>{
//     const parent = parents.find(c => c.id === parseInt(req.params.id));
//     if(err) return res.status(400).json('cant get parents');
//      res.json(parent);
// });


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




