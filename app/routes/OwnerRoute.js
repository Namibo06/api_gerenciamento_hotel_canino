const express = require('express');
const OwnerController = require('../controllers/OwnerController');
const router = express.Router();
const ownerController = new OwnerController();

router.get('/',(req,res) => ownerController.listOwners(req,res));
router.get('/:uuid',(req,res) => ownerController.getOwnerByUUID(req,res));
router.post('/',(req,res) => ownerController.createOwner(req,res));
router.put('/:uuid',(req,res) => ownerController.updateOwner(req,res));
router.delete('/:uuid',(req,res) => ownerController.deleteUser(req,res));


module.exports = router;