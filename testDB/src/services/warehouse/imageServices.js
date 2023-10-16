import db from "../../models";
import {
    createImageRepository,
    getAllImageRepository,
    getOneImageRepository,
    updateImageRepository,
    deleteImageRepository,
} from "../../repositories/warehouse/imageRepository";

export const createImage = async (body) => {
    try {
        let hasSuccess = false;
        for (const image of body) {
            try {
                const response = await createImageRepository({
                    src: image.src,
                    productId: +image.productId,
                });
                const success = response[1] === true ? true : false;
                if (success) {
                    hasSuccess = true;
                }
            } catch (error) {
                throw error;
            }
        }
        if (hasSuccess) {
            return {
                success: true,
                message: "Create image successfully",
            };
        } else {
            return {
                success: false,
                message: "Image is available",
            };
        }
    } catch (error) {
        throw error;
    }
};

export const getAllImage = async () => {
    try {
        const response = await getAllImageRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const getOneImage = async ({ id }) => {
    try {
        const response = await getOneImageRepository({ id });
        return {
            success: true,
            data: response.dataValues,
        };
    } catch (error) {
        return error;
    }
};

export const updateImage = async (id, body) => {
    try {
        const response = await updateImageRepository(id, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Updated image successfully`
                    : `Updated image failed`,
        };
    } catch (error) {
        return error;
    }
};

export const deleteImage = async ({ id }) => {
    try {
        const response = await deleteImageRepository({ id });
        return {
            success: response > 0 ? true : false,
            message: `Delete successfully`,
        };
    } catch (error) {
        return error;
    }
};
