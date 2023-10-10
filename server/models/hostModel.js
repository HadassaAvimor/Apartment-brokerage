const Joi = require('joi');
const mongoose = require('mongoose');

const hostSchema = new mongoose.Schema({
    name:String,
    city:String,
    accommodationUnit:Boolean,
    numOfBeds:Number,
    numOfMattresses:Number,
    numOfCribs:Number,
    hasMMD:Boolean,
    currentlyAvailable:Boolean,
    isAccessible:Boolean,
    payment:Boolean,
    notes:String,
    phone:String,
    whatsapp:Boolean,
    email:String,
    password:String
}, {collection: "host"});

const HostModel = mongoose.model("host", hostSchema);

const validHostFunc =(_bodyData)=>{
    let joiSchema=Joi.object({
        name:Joi.string().required(),
        city:Joi.string().required(),
        accommodationUnit:Joi.boolean().required(),
        numOfBeds:Joi.number().min(0, "Please enter a valid number").required(),
        numOfMattresses:Joi.number().min(0, "Please enter a valid number").required(),
        numOfCribs:Joi.number().min(0, "Please enter a valid number").required(),
        hasMMD:Joi.boolean().required(),
        currentlyAvailable:Joi.boolean().required(),
        isAccessible:Joi.boolean().required(),
        payment:Joi.boolean().required(),
        notes:Joi.string().required(),
        phone:Joi.string().required(),
        whatsapp:Joi.boolean().required(),
        email:Joi.string().required(),
        password: Joi.string().required()
    })
    return joiSchema.validate(_bodyData);
    }

    module.exports = {
        HostModel : HostModel,
        validHost : validHostFunc
    }