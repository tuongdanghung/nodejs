import { getAllCartByUserRepository } from "../repositories/cartRepository";

import {
    createOrderItemRepository,
    getAllOrderItemRepository,
} from "../repositories/orderItemRepository";
export const createOrderItem = async (id) => {
    try {
        const dataCartUser = await getAllCartByUserRepository({ id });
        const min = 100000000;
        const max = 999999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const createOrder = dataCartUser.map((item) => ({
            productSizeId: item.productSizeId,
            codeOrder: randomNumber,
            quantity: item.quantity,
        }));
        const idCart = dataCartUser.map((item) => item.id);
        const response = await createOrderItemRepository(createOrder, idCart);
        return {
            success: response.length > 0 ? true : false,
            message:
                response.length > 0
                    ? "Create order successfully"
                    : "Create order failed",
        };
    } catch (error) {
        return error;
    }
};

export const getAllOrderItem = async () => {
    try {
        const response = await getAllOrderItemRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
