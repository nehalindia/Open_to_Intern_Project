const express = require('express')
const router = express.Router()

const {createClg, createIntern, collegeDetails} = require('../controller/internController')

router.post('/functionup/colleges',createClg)
router.post('/functionup/interns',createIntern)

router.get('/functionup/collegeDetails',collegeDetails)

module.exports = router