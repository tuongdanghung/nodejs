import {
    createBrandRepository,
    getAllBrandRepository,
    getOneBrandRepository,
    updateBrandRepository,
    deleteBrandRepository,
} from "../../repositories/warehouse/brandRepository";

export const createBrand = async ({ title }) => {
    try {
        const response = await createBrandRepository({ title });
        return {
            success: response[1] === true ? true : false,
            message:
                response[1] === true
                    ? "Create brand successfully"
                    : "Brand is available",
        };
    } catch (error) {
        return error;
    }
};

export const getAllBrand = async () => {
    try {
        const response = await getAllBrandRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const getOneBrand = async ({ brandId }) => {
    try {
        const response = await getOneBrandRepository({ brandId });
        return {
            success: true,
            data: response?.dataValues,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateBrand = async (brandId, body) => {
    try {
        const response = await updateBrandRepository(brandId, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Updated brand successfully`
                    : `Updated brand failed`,
        };
    } catch (error) {
        return error;
    }
};

export const deleteBrand = async ({ brandId }) => {
    try {
        const response = await deleteBrandRepository({ brandId });
        return {
            success: response > 0 ? true : false,
            message: `Delete successfully`,
        };
    } catch (error) {
        return error;
    }
};
