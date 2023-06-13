const validurl = require('valid-url')
const Obj = require('mongoose').Types.ObjectId
const clgModel = require('../model/collegeModel')
const intModel = require('../model/internModel')

const createClg = async (req,res) => {
   try{
        let data = req.body
        if(!data.name){
            return res.status(400).send({status :false, message: "Must add name"})
        }
        let name = await clgModel.findOne({name:data.name})
        if(name){
            return res.status(400).send({status :false, message: " name already exist!"})
        }
        if(!data.fullName){
            return res.status(400).send({status :false, message: "Must add fullname"})
        }
        if (!validurl.isUri(data.logoLink)){
            return res.status(400).send({status :false, message: "Not a valid Url"})
        }

        let result = await clgModel.create(data)
        let responseData = {name:result.name, fullName:result.fullName, logoLink:result.logoLink, isDeleted:result.isDeleted }
        return res.status(201).send({status:true, data: responseData})
    }catch(error){
        res.status(500).send({status : false,message: error.message})
    }
}


const createIntern = async (req,res) => {
    try{
        let data = req.body
        if(!data.name){
            return res.status(400).send({status :false, message: "Must add name"})
        }
        if(!data.email){
            return res.status(400).send({status :false, message: "Must add name"})
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
            return res.status(400).send({status: false, message:  'Email should be a valid email address'})
        }
        const existingAuthor = await intModel.findOne({ email: data.email });
        if(existingAuthor) {
                return res.status(400).send({status: false, message:  'Email already exists'});
        }
        if(!data.mobile){
            return res.status(400).send({status :false, message: "Must add mobile number"})
        }
        if(data.mobile.length !== 10){
            return res.status(400).send({status :false, message: "Must add valid mobile number"})
        }
        const existingmobile = await intModel.findOne({ email: data.mobile });
        if(existingmobile) {
                return res.status(400).send({status: false, message:  'Email already exists'});
        }
        if(!data.collegeName){
            return res.status(400).send({status :false, message: "Must add clg"})
        }
        // if(!obj.isValid(data.collegeId)){
        //     return res.status(400).send({status :false, message: "Not a valid Id"})
        // }
        let clgId = await clgModel.findOne({name:data.collegeName})
        if(!clgId) {
            return res.status(404).send({status: false, message:  'College not exists'});
        }
        data.collegeId = clgId._id
        delete data.collegeName

        let result = await intModel.create(data)
        let responseData = {isDeleted:result.isDeleted, name: result.name, email: result.email, 
            mobile:result.mobile, collegeId: result.collegeId}
        return res.status(201).send({status:true, data: responseData})
    }catch(error){
        res.status(500).send({status : false,message: error.message})
    }
}

const getIntern = async (req,res) => {
    try{
        let clgName = req.query.collegeName
        if(!clgName){
            return res.status(404).send({status :false, message: "Must add clgname"})
        }
        let clgId = await clgModel.findOne({name:clgName})
        if(!clgId){
            return res.status(404).send({status :false, message: "College not exist"})
        }
        let intern = await intModel.find({collegeId:clgId._id}).select({_id:1, name:1, email:1, mobile:1})
        let responseData = {name: clgId.name, fullName: clgId.fullName, logoLink:clgId.logoLink}
        if(!intern){
            responseData.interns = "No interns here"
        }
        else{
            responseData.interns = intern
        }
        return res.status(200).send({status:true, data: responseData})
    }catch(error){
        res.status(500).send({status : false,message: error.message})
    }
}

module.exports = {createClg, createIntern, getIntern}