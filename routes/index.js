const express = require('express')
const router = express.Router()

// @desc    Login/Landing page
// @route   GET /

router.get('/', (req, res) => {
    res.send('login')
})

// @desc    Login/Landing page
// @route   GET /

router.get('/dashboard', (req, res) => {
    res.send('dashboard')
})

module.exports = router