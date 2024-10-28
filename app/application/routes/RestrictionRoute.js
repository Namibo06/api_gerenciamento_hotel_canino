const express = require('express');
const router = express.Router();
const RestrictionController = require('../../application/controllers/RestrictionController');
const restrictionController = new RestrictionController();

router.get('/',(req,res) => restrictionController.findAllRestrictions(req,res));
router.get('/:uuid',(req,res) => restrictionController.findRestrictionByUuid(req,res));
router.post('/',(req,res) => restrictionController.createRestriction(req,res));
router.put('/:uuid',(req,res) => restrictionController.updateRestriction(req,res));
router.delete('/:uuid',(req,res) => restrictionController.deleteRestriction(req,res));

module.exports = router;