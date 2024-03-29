const express = require("express");
const router = express.Router()
const CategoryController = require('../controllers/CategoryController');


router.post('/create', CategoryController.createCategory)
router.get('/get-all', CategoryController.getAllCategory)

module.exports = router