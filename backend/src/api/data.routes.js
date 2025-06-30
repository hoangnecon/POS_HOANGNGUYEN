const express = require('express');
const dataController = require('../controllers/data.controller');
const router = express.Router();

// Các API này sẽ được bảo vệ bởi middleware `protect` ở file `api/index.js`
router.get('/menu', dataController.getMenuData);
router.get('/tables', dataController.getTableData);

module.exports = router;