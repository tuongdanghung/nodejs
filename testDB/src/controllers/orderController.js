import * as services from "../services";
import { internalServerError } from "../middlewares/handleErrors";

export const createOrder = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await services.createOrder(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllOrder = async (req, res) => {
    try {
        const response = await services.getAllOrder();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.updateOrder(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
