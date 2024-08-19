const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const loginController = new LoginController();
const authenticateToken = require('../middlewares/AuthenticateToken');

router.post('/',(req,res) => loginController.authenticate(req,res));
router.post('/verifyToken', authenticateToken,(req,res) => loginController.verifyToken(req,res));

module.exports = router;