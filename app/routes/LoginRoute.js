const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const loginController = new LoginController();

router.post('/',(req,res) => loginController.authenticate(req,res));
router.post('/verifyToken',(req,res) => loginController.verifyToken(req,res));

module.exports = router;