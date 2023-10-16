import {
    createCapacityRepository,
    getAllCapacityRepository,
    getOneCapacityRepository,
    updateCapacityRepository,
    deleteCapacityRepository,
} from "../../repositories/warehouse/capacityRepository";
export const createCapacity = async ({ size, percent }) => {
    try {
        const response = await createCapacityRepository({ size, percent });
        console.log(response);
        return {
            success: response[1] === true ? true : false,
            message:
                response[1] === true
                    ? "Create capacity successfully"
                    : "Capacity is available",
        };
    } catch (error) {
        return error;
    }
};

export const getAllCapacity = async () => {
    try {
        const response = await getAllCapacityRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const getOneCapacity = async ({ capacityId }) => {
    try {
        const response = await getOneCapacityRepository({ capacityId });
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const updateCapacity = async (capacityId, body) => {
    try {
        const response = await updateCapacityRepository(capacityId, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Updated capacity successfully`
                    : `Updated capacity failed`,
        };
    } catch (error) {
        return error;
    }
};

export const deleteCapacity = async ({ capacityId }) => {
    try {
        const response = await deleteCapacityRepository({ capacityId });
        return {
            success: response > 0 ? true : false,
            message: `Delete successfully`,
        };
    } catch (error) {
        return error;
    }
};
