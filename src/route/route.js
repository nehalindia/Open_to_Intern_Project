const express = require('express')
const router = express.Router()

const {createClg, createIntern, getIntern} = require('../controller/internController')

router.post('/functionup/colleges',createClg)
router.post('/functionup/interns',createIntern)

router.get('/functionup/collegeDetails',getIntern)

module.exports = router