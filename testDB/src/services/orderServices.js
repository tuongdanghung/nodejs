import { getAllOrderItemRepository } from "../repositories/orderItemRepository";
import {
    createOrderRepository,
    getAllOrderRepository,
    updateOrderRepository,
} from "../repositories/orderRepository";
export const createOrder = async (id, body) => {
    try {
        const dataOrderItem = await getAllOrderItemRepository();
        const dataOrder = await getAllOrderRepository();
        const codeOrders = new Set();

        for (const item of dataOrderItem) {
            if (!codeOrders.has(item.codeOrder)) {
                const createOrder = {
                    orderItemId: item.codeOrder,
                    addressId: +body.addressId,
                    paymentId: +body.paymentId,
                    userId: id,
                };
                const response = await createOrderRepository(createOrder);
                return {
                    success: response > 0 ? true : false,
                    message:
                        response > 0
                            ? "Create order successfully"
                            : "Create order failed",
                };
            }
        }
    } catch (error) {
        return error;
    }
};

export const getAllOrder = async () => {
    try {
        const response = await getAllOrderRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const updateOrder = async (id, body) => {
    try {
        const response = await updateOrderRepository(id, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Status updated successfully`
                    : `Update Status failed`,
        };
    } catch (error) {
        return error;
    }
};
