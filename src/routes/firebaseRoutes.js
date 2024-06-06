const express = require('express');
const firebaseAuthController = require('../controllers/firebase-auth-controller');
const router = express.Router();

router.post('/register', firebaseAuthController.registerUser);
router.post('/login', firebaseAuthController.loginUser);
router.post('/logout', firebaseAuthController.logoutUser);
router.post('/reset-password', firebaseAuthController.resetPassword);

module.exports = router;