const express = require('express');
const router = express.Router();
const DogController = require('../controllers/DogController');

router.get('/',DogController.listDogs);
router.get('/:uuid',DogController.getDogByUUID);
router.post('/',DogController.createDog);
router.put('/:uuid',DogController.updateDog);
router.delete('/:uuid',DogController.deleteDog);

module.exports = router;