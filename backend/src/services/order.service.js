const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Lấy một đơn hàng PENDING duy nhất dựa trên tableId.
 * @param {string} tableId - ID của bàn.
 * @returns {Promise<object>} - Một đối tượng chứa { tableId, items }.
 */
const getActiveOrderByTableId = async (tableId) => {
    const order = await prisma.order.findFirst({
        where: { tableId: String(tableId), status: 'PENDING' },
        include: {
            orderItems: {
                include: { menuItem: true },
                orderBy: { id: 'asc' },
            },
        },
    });

    if (!order) {
        return { tableId, items: [] };
    }

    return {
        tableId: order.tableId,
        items: order.orderItems.map(oi => ({
            ...oi.menuItem,
            quantity: oi.quantity,
            note: oi.note,
            orderItemId: oi.id,
        })),
    };
};


const getActiveOrders = async () => {
    // ... (Giữ nguyên hàm này)
    const activeOrders = await prisma.order.findMany({
        where: { status: 'PENDING' },
        include: {
          orderItems: {
            include: { menuItem: true },
            orderBy: { id: 'asc' },
          },
        },
    });
    const ordersByTable = {};
    activeOrders.forEach(order => {
        ordersByTable[order.tableId] = order.orderItems.map(oi => ({
            ...oi.menuItem,
            quantity: oi.quantity,
            note: oi.note,
            orderItemId: oi.id,
        }));
    });
    return ordersByTable;
};

const addItemToOrder = async (data) => {
    const { tableId, itemId, quantity, userId } = data;

    const menuItem = await prisma.menuItem.findUnique({ where: { id: itemId } });
    if (!menuItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Món ăn không tồn tại');
    }

    await prisma.$transaction(async (tx) => {
        let order = await tx.order.findFirst({
            where: { tableId: String(tableId), status: 'PENDING' },
        });

        if (!order) {
            order = await tx.order.create({
                data: {
                    tableId: String(tableId),
                    tableName: tableId === 'takeaway' ? 'Mang về' : `Bàn ${tableId}`,
                    userId: userId,
                    status: 'PENDING',
                },
            });
        }

        const existingOrderItem = await tx.orderItem.findFirst({
            where: { orderId: order.id, menuItemId: itemId },
        });

        if (existingOrderItem) {
            await tx.orderItem.update({
                where: { id: existingOrderItem.id },
                data: { quantity: { increment: quantity } },
            });
        } else {
            await tx.orderItem.create({
                data: {
                    orderId: order.id,
                    menuItemId: itemId,
                    quantity: quantity,
                    priceAtOrder: menuItem.price,
                },
            });
        }
    });

    // Sau khi thay đổi, chỉ lấy lại dữ liệu của bàn đó
    return getActiveOrderByTableId(tableId);
};

const updateOrderItemQuantity = async (orderItemId, newQuantity) => {
    const orderItem = await prisma.orderItem.findUnique({
        where: { id: orderItemId },
        select: { order: { select: { tableId: true } } }
    });

    if (!orderItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy món trong đơn hàng');
    }

    if (newQuantity <= 0) {
        await prisma.orderItem.delete({ where: { id: orderItemId } });
    } else {
        await prisma.orderItem.update({
            where: { id: orderItemId },
            data: { quantity: newQuantity },
        });
    }

    return getActiveOrderByTableId(orderItem.order.tableId);
};

const clearTableOrder = async (tableId) => {
    const order = await prisma.order.findFirst({
        where: { tableId: String(tableId), status: 'PENDING' },
    });

    if (order) {
        await prisma.$transaction([
            prisma.orderItem.deleteMany({ where: { orderId: order.id } }),
            prisma.order.delete({ where: { id: order.id } }),
        ]);
    }
};

module.exports = {
    getActiveOrders,
    addItemToOrder,
    updateOrderItemQuantity,
    clearTableOrder,
};