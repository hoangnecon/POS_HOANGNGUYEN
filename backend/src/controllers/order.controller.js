const httpStatus = require('http-status');
const orderService = require('../services/order.service');
const ApiError = require('../utils/ApiError');

const getActiveOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getActiveOrders();
        res.status(httpStatus.OK).json(orders);
    } catch (error) {
        next(error);
    }
};

const addItemToOrder = async (req, res, next) => {
    try {
        const { tableId, itemId, quantity } = req.body;
        const userId = req.user.id;
        
        if (!tableId || !itemId || !quantity) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Thiếu thông tin bàn, món ăn hoặc số lượng');
        }

        const updatedOrder = await orderService.addItemToOrder({ tableId, itemId, quantity, userId });
        res.status(httpStatus.OK).json(updatedOrder);

    } catch (error) {
        next(error);
    }
};

const updateOrderItemQuantity = async (req, res, next) => {
    try {
        const { orderItemId } = req.params;
        const { quantity } = req.body;

        const updatedOrder = await orderService.updateOrderItemQuantity(Number(orderItemId), quantity);
        res.status(httpStatus.OK).json(updatedOrder);

    } catch(error) {
        next(error);
    }
};

const clearTable = async (req, res, next) => {
    try {
        const { tableId } = req.params;
        await orderService.clearTableOrder(tableId);
        // Sau khi xóa, trả về một đối tượng rỗng cho bàn đó
        res.status(httpStatus.OK).json({ tableId, items: [] });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getActiveOrders,
    addItemToOrder,
    updateOrderItemQuantity,
    clearTable,
};