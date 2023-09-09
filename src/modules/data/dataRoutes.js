const express = require('express');
const router = express.Router();
const dataController = require('./dataController');

router.post('/get',dataController.get);
router.put('/post/:user_id',dataController.post);
router.post("/get/:user_id",dataController.getSpecificId);
router.post("/delete/:user_id",dataController.delete);
module.exports =router;