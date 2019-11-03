const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const populate = require('node-populate');
const Child = require('./child');


const parentSchema = mongoose.Schema({
    first_name: {type:String, required: true},
    last_name: {type: String, required:true},
    username: {type:String, required:true},
    email: {type: String, required:true, unique:true},
    phoneNumber: {type: Number, required: true, unique: true},
     password: { type: String, required: true, minlength: 5, maxlength: 1024},
     children: [{ type: Schema.Types.ObjectId, ref: 'Child'}],
     daycare: [{ type: Schema.Types.ObjectId, ref: 'Daycare'}]
});

function validateParent(parent){
  const schema = Joi.object({ 
      first_name: Joi.string().min(4).max(15).required(),
       last_name: Joi.string().min(3).max(15).required(),
       username: Joi.string().min(4).max(15).required(),
        email:Joi.string().min(7).max(20).required().email(),
        phoneNumber: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
        password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({laguage: {any: { allowedOnly: 'must match password'}}})
        });
  return Joi.validate(parent, schema);

   
}


const Parent = mongoose.model('Parent',parentSchema);

exports.Parent = Parent;
exports.validate = validateParent;



// function getParentsWithChild(phoneNumber){
//   return Parent.findOne({ phoneNumber: phoneNumber })
//     .populate('child').exec((err, child) => {
//       console.log("Populated Parent " + child);
//     })
// }





// const aParent = new Parent({first_name: 'aman', last_name:'girma', username:'amanaae', 
// email: 'eiwien@gmail.com',phoneNumber:'8746655', password:'8474647'});

// aParent.child.push({ first_name: 'aman', last_name:'girma', date_of_birth:'5/8/1990', 
// medical_detail:['allergies','commoncold'],emergency_contact: '0315847584',img: 'img'});

// aParent.save((err,data) => {}); 

    //  async function createChild( first_name,
    //   last_name, date_of_birth, gender, medical_detail, emergency_contact, img, parent){
    //    const child = new Child({
    //     first_name,
    //     last_name,
    //     date_of_birth,
    //     gender,
    //     medical_detail,
    //     emergency_contact,
    //     img,
    //     parent
    //    })
    //    const result = await child.save();
    //    console.log(result);
    //  }

   

      