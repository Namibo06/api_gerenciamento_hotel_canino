const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/OwnerController');

router.get('/',OwnerController.listOwners);
router.get('/:uuid',OwnerController.getOwnerByUUID);
router.post('/',OwnerController.createOwner);
router.put('/:uuid',OwnerController.updateOwner);
router.delete('/:uuid',OwnerController.deleteUser);


module.exports = router;