const express = require('express');
const OwnerController = require('../../application/controllers/OwnerController');
const router = express.Router();
const ownerController = new OwnerController();
const authenticateToken = require('../../application/middlewares/AuthenticateToken');

router.get('/', authenticateToken,(req,res) => ownerController.listOwners(req,res));
router.get('/:uuid', authenticateToken,(req,res) => ownerController.getOwnerByUUID(req,res));
router.post('/', authenticateToken,(req,res) => ownerController.createOwner(req,res));
router.put('/:uuid', authenticateToken,(req,res) => ownerController.updateOwner(req,res));
router.delete('/:uuid', authenticateToken,(req,res) => ownerController.deleteUser(req,res));


module.exports = router;