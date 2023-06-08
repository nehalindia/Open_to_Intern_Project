// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, 
// collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const intern = new mongoose.Schema({
    name: {
        required :[true,'name is mandatory'],
        type: String
    },
    email: {
        required :[true,'email is mandatory'],
        unique :[true, 'email should Unique'],
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill a valid email address', isAsync: false
        },
        type: String
    },
    mobile: {
        required :[true,'mobile is mandatory'],
        unique :true,
        type: String
    },
    collegeId: {
        type:ObjectId, 
        ref:'college'
    }, 
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps :true})

module.exports = mongoose.model('intern',intern)