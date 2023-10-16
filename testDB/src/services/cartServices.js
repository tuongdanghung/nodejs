import {
    createCartRepository,
    getAllCartRepository,
    getAllCartByUserRepository,
    getOneCartRepository,
    updateCartRepository,
    deleteCartRepository,
} from "../repositories/cartRepository";

export const createCart = async (body) => {
    try {
        const response = await createCartRepository({
            productSizeId: body.productSizeId,
            userId: body.userId,
            quantity: +body.quantity,
        });
        return {
            success: response[1] === true ? true : false,
            message:
                response[1] === true
                    ? "Create cart successfully"
                    : "Cart is available",
        };
    } catch (error) {
        return error;
    }
};

export const getAllCart = async () => {
    try {
        const response = await getAllCartRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const getAllCartByUser = async ({ id }) => {
    try {
        const response = await getAllCartByUserRepository({ id });
        const carts = response.map((item) => item.toJSON());
        return {
            success: true,
            data: carts,
        };
    } catch (error) {
        return error;
    }
};

export const getOneCart = async ({ id }) => {
    try {
        const response = await getOneCartRepository({ id });
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const updateCart = async (id, body) => {
    try {
        const response = await updateCartRepository(id, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Cart updated successfully`
                    : `Update cart failed`,
        };
    } catch (error) {
        return error;
    }
};

export const deleteCart = ({ id }) => {
    try {
        const response = deleteCartRepository({ id });
        return {
            success: response > 0 ? true : false,
            message: `Delete role successfully`,
        };
    } catch (error) {
        return error;
    }
};
