
const {validate,Parent} = require('../models/parents');
const express = require('express');
const router = express.Router();



router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error){
        return res.status(400).json(error.details[0].message);
    }
    let parent = await Parent.findOne({phoneNumber:req.body.phoneNumber});
    if (parent)  return res.status(400).json('user already exisits!');
     console.log('second err');
     try{
        // Insert the new parent if they do not exist yet
        parent = new Parent ({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            
        }); 
        await parent.save();
        res.send(parent);
     }
     catch(err){
    res.json(err);
     }
    
});
// router.get('/', async(req,res)=>{

// })

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

module.exports = router;


