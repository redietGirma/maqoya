
const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = mongoose.Schema({
    First_name: {type:String, required: true},
    Last_name: {type: String, required:true},
    username: {type:String, required:true},
    email: {type: String},
    phoneNumber: {type: Number, required: true},
     password: { type: String, required: true},
     child: [{ type: Schema.Types.ObjectId, ref: 'Child'}],
     daycare: [{type: Schema.Types.ObjectId,ref: 'Daycare'}],
});
function getParentsWithChild(phoneNumber){
  return Parent.findOne({ phoneNumber: phoneNumber })
    .populate('child').exec((err, child) => {
      console.log("Populated Parent " + child);
    })
}
const childSchema = mongoose.Schema({
    First_name: {type:String, required: true},
    Last_name: {type:String, required: true},
    date_of_birth: {type: String, required: true},
    gender: {type:String, required: true},
    medical_detail:{type:String},
    emergency_contact: {type:String, required:true},
    img: { data: Buffer, contentType: String },
    // parent : [{type: mongoose.Schema.Types.ObjectId, ref : 'Parent'}]
    
});
const daycareSchema = mongoose.Schema({
  name: {type:String, required: true},
  email: {type:String},
  description: {type:String, required: true},
  phoneNumber:{type:String, required:true},
  rating:{type:String},
  location:[String],
  imageUrl:{type:String},
  date: {type: Date, default: Date.now},
  img: { data: Buffer, contentType: String },
  child: [{ type: Schema.Types.ObjectId, ref: 'Child'}],
  parent : [{type: mongoose.Schema.Types.ObjectId, ref : 'Parent'}]



});

const Child = mongoose.model('Child', childSchema);
const Parent = mongoose.model('Parent',parentSchema);
const Daycare = mongoose.model('Daycare', daycareSchema);

function validateParent(parent){
    const schema = Joi.object({
      email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(50).required()
          });
    return Joi.validate(parent, schema);
   
}
    exports.Parent = Parent;
    exports.Child = Child;
    exports.Daycare = Daycare;
    exports.validate = validateParent;

   

      