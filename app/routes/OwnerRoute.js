const express = require('express');
const router = express.Router();
const OwnerController = require('../controllers/OwnerController');

router.get('/',OwnerController.listOwners);
router.post('/',OwnerController.createOwner);


module.exports = router;