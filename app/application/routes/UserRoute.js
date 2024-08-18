const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticateToken = require('../middlewares/AuthenticateToken');
const userController = new UserController();

router.get('/', authenticateToken,(req,res) => userController.listUsers(req,res));
router.get('/:uuid', authenticateToken, (req,res) => userController.getUserByUUID(req,res));
router.post('/', (req,res) => userController.createUser(req,res));
router.patch('/:uuid', authenticateToken,(req,res) => userController.updateUser(req,res));
router.patch('/updatePassword/:uuid', authenticateToken,(req,res) => userController.updatePassword(req,res));
router.delete('/:uuid', authenticateToken,(req,res) => userController.deleteUser(req,res));

module.exports = router;
