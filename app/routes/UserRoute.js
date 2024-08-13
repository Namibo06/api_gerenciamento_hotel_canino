const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/',UserController.listUsers);
router.get('/:uuid',UserController.getUserByUUID);
router.post('/',UserController.createUser);

module.exports = router;
