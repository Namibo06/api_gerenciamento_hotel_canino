const express = require('express');
const router = express.Router();
const DogController = require('../controllers/DogController');

router.get('/',DogController.listDogs);
router.post('/',DogController.createDog);

module.exports = router;