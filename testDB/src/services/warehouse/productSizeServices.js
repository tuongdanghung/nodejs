import db from "../../models";
import {
    createProductSizeRepository,
    getAllProductSizeRepository,
    getOneProductSizeRepository,
    updateProductSizeRepository,
} from "../../repositories/warehouse/productSizeRepository";
export const createProductSize = async (body) => {
    try {
        let hasSuccess = false;
        for (const capacity of body.capacityId) {
            for (const color of body.colorId) {
                const item = {
                    productId: body.productId,
                    capacityId: capacity,
                    colorId: color,
                };

                try {
                    const response = await createProductSizeRepository({
                        productId: item.productId,
                        capacityId: item.capacityId,
                        colorId: item.colorId,
                    });
                    const success = response[1] === true ? true : false;
                    if (success) {
                        hasSuccess = true;
                    }
                } catch (error) {
                    throw error;
                }
            }
        }
        if (hasSuccess) {
            return {
                success: true,
                message: "Create ProductDetail successfully",
            };
        } else {
            return {
                success: false,
                message: "ProductDetail is available",
            };
        }
    } catch (error) {
        throw error;
    }
};

export const getAllProductSize = async () => {
    try {
        const response = await getAllProductSizeRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const getOneProductSize = async ({ id }) => {
    try {
        const response = await getOneProductSizeRepository({ id });
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const updateProductSize = async (body) => {
    try {
        const items = [];
        for (const capacity of body.capacityId) {
            for (const color of body.colorId) {
                for (const productId of body.productSizeId) {
                    const item = {
                        id: productId, // Thêm trường id từ mảng productIds
                        productId: body.productId,
                        capacityId: capacity,
                        colorId: color,
                    };
                    items.push(item); // Thêm mỗi item vào mảng items
                }
            }
        }
        const uniqueObjects = [];

        items.forEach((obj) => {
            if (
                !uniqueObjects.some(
                    (uniqueObj) =>
                        uniqueObj.productId === obj.productId &&
                        uniqueObj.capacityId === obj.capacityId &&
                        uniqueObj.colorId === obj.colorId
                )
            ) {
                uniqueObjects.push(obj);
            }
        });
        for (const item of uniqueObjects) {
            await updateProductSizeRepository(item);
        }
        return {
            success: true,
            message: `Updated product successfully`,
        };
    } catch (error) {
        return error;
    }
};
