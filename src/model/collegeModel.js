// { name: { mandatory, unique, example iith}, fullName:
//  {mandatory, example `Indian Institute of Technology, Hyderabad`},
//  logoLink: {mandatory}, isDeleted: {boolean, default: false} }


const mongoose = require('mongoose')

const college = new mongoose.Schema({
    name: { 
        required:[true, "name is required"], 
        unique: [true, "must be unique"], 
        type: String
    },
    fullName: {
        required: [true, "Must add full name"],
        type: String
    },
    logoLink: {
        required: [true, "Must add logo link"],
        type: String
    },
    isDeleted: {
        type: Boolean, 
        default: false
    }
},{timestamps :true})

module.exports = mongoose.model('college', college)