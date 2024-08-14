const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/',UserController.listUsers);
router.get('/:uuid',UserController.getUserByUUID);
router.post('/',UserController.createUser);
router.patch('/:uuid',UserController.updateUser);
router.delete('/:uuid',UserController.deleteUser);

module.exports = router;
