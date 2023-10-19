import { getAllOrderItemRepository } from "../repositories/orderItemRepository";
import {
    createOrderRepository,
    getAllOrderRepository,
    updateOrderRepository,
    getAllOrderByUserRepository,
} from "../repositories/orderRepository";
export const createOrder = async (id, body) => {
    try {
        const dataOrderItem = await getAllOrderItemRepository();
        const uniqueCodeOrders = [
            ...new Set(dataOrderItem.map((item) => item.codeOrder)),
        ];
        for (const item of uniqueCodeOrders) {
            const createOrder = {
                orderItemId: item,
                addressId: +body.addressId,
                paymentId: +body.paymentId,
                userId: id,
            };
            await createOrderRepository(createOrder);
        }
        return {
            success: true,
            message: "Create order successfully",
        };
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

export const getAllOrderByUser = async ({ id }) => {
    try {
        const response = await getAllOrderByUserRepository({ id });
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
