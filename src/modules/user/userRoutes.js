const express = require("express");
const router = express.Router();
const userController = require("./userController");

router.post("/get", userController.get);
router.post("/post", userController.post);
router.put("/put/:user_id",userController.put);

module.exports = router;
