const express = require('express');
const router = express.Router();
const DogController = require('../controllers/DogController');
const dogController = new DogController();

router.get('/',(req,res) => dogController.listDogs(req,res));
router.get('/:uuid',(req,res) => dogController.getDogByUUID(req,res));
router.post('/',(req,res) => dogController.createDog(req,res));
router.put('/:uuid',(req,res) => dogController.updateDog(req,res));
router.delete('/:uuid',(req,res) => dogController.deleteDog(req,res));

module.exports = router;