const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/OwnerController');

router.get('/',OwnerController.listOwners);
router.get('/:uuid',OwnerController.getOwnerByUUID);
router.post('/',OwnerController.createOwner);
router.patch('/:uuid',OwnerController.updateOwner);


module.exports = router;