import * as services from "../../services";
import { internalServerError } from "../../middlewares/handleErrors";

export const createProductSize = async (req, res) => {
    try {
        const response = await services.createProductSize(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllProductSize = async (req, res) => {
    try {
        const response = await services.getAllProductSize();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneProductSize = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await services.getOneProductSize({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateProductSize = async (req, res) => {
    try {
        const response = await services.updateProductSize(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
