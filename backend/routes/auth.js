const express = require('express');
const router = express.Router();
const { login, signup, logout, checkAuth } = require('../controllers/auth');

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/check', checkAuth);

module.exports = router;
