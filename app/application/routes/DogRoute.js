const express = require('express');
const router = express.Router();
const DogController = require('../../application/controllers/DogController');
const dogController = new DogController();
const authenticateToken = require('../../application/middlewares/AuthenticateToken');

router.get('/', authenticateToken,(req,res) => dogController.listDogs(req,res));
router.get('/:uuid', authenticateToken,(req,res) => dogController.getDogByUUID(req,res));
router.post('/', authenticateToken,(req,res) => dogController.createDog(req,res));
router.put('/:uuid', authenticateToken,(req,res) => dogController.updateDog(req,res));
router.delete('/:uuid', authenticateToken,(req,res) => dogController.deleteDog(req,res));

module.exports = router;