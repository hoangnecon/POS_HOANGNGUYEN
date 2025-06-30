const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();

router.get('/active', orderController.getActiveOrders);
router.post('/add-item', orderController.addItemToOrder);
router.put('/item/:orderItemId', orderController.updateOrderItemQuantity);
router.delete('/table/:tableId', orderController.clearTable);

module.exports = router;