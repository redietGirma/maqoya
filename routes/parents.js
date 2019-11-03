const {validate,Parent} = require('../models/parents');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const config = require('config');


// new parent registration route
router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    let parent = await Parent.findOne({email:req.body.email});
    if (parent)  return res.status(400).json('user already exisits!');

       // Insert the new parent if they do not exist yet
        parent = new Parent (req.body); 
        const salt =  await bcrypt.genSalt(10);
        parent.password = await bcrypt.hash(parent.password, salt);
        await parent.save();

        const token =  await Jwt.sign({_id: parent._id}, config.get('jwtPrivateKey'));
        try{
        res.header('x-auth-token', token)
            res.send({data: _.pick(parent,['id','first_name','last_name','username','email','phoneNumber'])});
        }
        catch (ex) {
            res.status(500).json({error: 'something failed'});
        }
    });


 module.exports = router;


 //get parent along with child(get child profile here)
router.get('/:id', async (req,res)=>{
    try{
        const parent = await Parent.findOne({ _id: req.params.id }).populate('children').select('-password');
        res.json(parent);
    } catch(error){
        res.status(400).json('cant get parents');
    }
});

//update fields in parent
router.put('/:id', async(req,res) => {
    try{
    const parent = await Parent.find(c => c.id === parseInt(req.params.id));
    if (!parent) res.status(400).json('parent not found');

    const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    parent.name = req.body.name;
    parent.email = req.body.email;
    parent.phoneNumber = req.body.phoneNumber;
    res.json(parent);
    }
    catch(error){
        res.status(400).json('can not update');
    }
});