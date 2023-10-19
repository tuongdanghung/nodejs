import {
    createColorRepository,
    getAllColorRepository,
    getOneColorRepository,
    updateColorRepository,
    deleteColorRepository,
} from "../../repositories/warehouse/colorRepository";
export const createColor = async ({ color }) => {
    try {
        const response = await createColorRepository({ color });
        return {
            success: response[1] === true ? true : false,
            message:
                response[1] === true
                    ? "Create color successfully"
                    : "Color is available",
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllColor = async () => {
    try {
        const response = await getAllColorRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const getOneColor = async ({ colorId }) => {
    try {
        const response = await getOneColorRepository({ colorId });
        return {
            success: true,
            data: response.dataValues,
        };
    } catch (error) {
        return error;
    }
};

export const updateColor = async (colorId, body) => {
    try {
        const response = await updateColorRepository(colorId, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Color updated successfully`
                    : `Updated color failed`,
        };
    } catch (error) {
        reject(error);
    }
};

export const deleteColor = ({ colorId }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await deleteColorRepository({ colorId });
            resolve({
                success: response > 0 ? true : false,
                message: `Delete successfully`,
            });
        } catch (error) {
            reject(error);
        }
    });
