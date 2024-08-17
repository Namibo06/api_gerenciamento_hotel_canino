const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const userController = new UserController();

router.get('/',(req,res) => userController.listUsers(req,res));
router.get('/:uuid', (req,res) => userController.getUserByUUID(req,res));
router.post('/',(req,res) => userController.createUser(req,res));
router.patch('/:uuid',(req,res) => userController.updateUser(req,res));
router.patch('/updatePassword/:uuid',(req,res) => userController.updatePassword(req,res));
router.delete('/:uuid',(req,res) => userController.deleteUser(req,res));

module.exports = router;
