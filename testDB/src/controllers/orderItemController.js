import * as services from "../services";
import { internalServerError } from "../middlewares/handleErrors";

export const createOrderItem = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await services.createOrderItem(id);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllOrderItem = async (req, res) => {
    try {
        const response = await services.getAllOrderItem();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
