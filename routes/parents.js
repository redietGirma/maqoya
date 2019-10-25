
const {validate,Parent} = require('../models/parents');
const express = require('express');
const router = express.Router();



router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error){
        console.log('req.body error')
        return res.status(400).send(error.details[0].message);
    }
    let parent =  Parent.findOne({email:req.body.email});
    if (parent)  return res.status(400).send('user already exisits!');
     console.log('second err');
     try{

       // Insert the new parent if they do not exist yet
        parent = new Parent(req.body);
        await parent.save();
        res.send(parent);
     }
     catch(err){
     console.log('error');
       // res.send(err);
     }
    
});
module.exports = router;


// {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     password: req.body.password,
//     phoneNumber: req.body.phoneNumber,
// }