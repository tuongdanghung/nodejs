import * as services from "../services";
import { internalServerError } from "../middlewares/handleErrors";

export const createFavourite = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await services.createFavourite({
            ...req.body,
            userId: id,
        });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllFavourite = async (req, res) => {
    try {
        const response = await services.getAllFavourite();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllFavouriteByUser = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await services.getAllFavouriteByUser({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteFavourite = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.deleteFavourite({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
