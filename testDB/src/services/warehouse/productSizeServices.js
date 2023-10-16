import db from "../../models";
import {
    createProductSizeRepository,
    getAllProductSizeRepository,
    getOneProductSizeRepository,
    updateProductSizeRepository,
    deleteProductSizeRepository,
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
        // const data = {
        //     a: body.productId,
        //     a: capacity,
        //     a: color,
        // };
        // console.log(data);
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
