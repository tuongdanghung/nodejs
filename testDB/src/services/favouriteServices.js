import {
    createFavouriteRepository,
    getAllFavouriteRepository,
    getAllFavouriteByUserRepository,
    getOneFavouriteRepository,
    updateFavouriteRepository,
    deleteFavouriteRepository,
} from "../repositories/favouriteRepository";

export const createFavourite = async (body) => {
    try {
        const response = await createFavouriteRepository(body);
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

export const getAllFavourite = async () => {
    try {
        const response = await getAllFavouriteRepository();
        return {
            success: true,
            data: response,
        };
    } catch (error) {
        return error;
    }
};

export const getAllFavouriteByUser = async ({ id }) => {
    try {
        const response = await getAllFavouriteByUserRepository({ id });
        const carts = response.map((item) => item.toJSON());
        return {
            success: true,
            data: carts,
        };
    } catch (error) {
        return error;
    }
};

export const deleteFavourite = ({ id }) => {
    try {
        const response = deleteFavouriteRepository({ id });
        return {
            success: response > 0 ? true : false,
            message: `Delete role successfully`,
        };
    } catch (error) {
        return error;
    }
};
