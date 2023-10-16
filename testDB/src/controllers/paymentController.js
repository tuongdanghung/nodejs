import * as services from "../services";
import { internalServerError } from "../middlewares/handleErrors";

export const createPayment = async (req, res) => {
    try {
        const response = await services.createPayment(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllPayment = async (req, res) => {
    try {
        const response = await services.getAllPayment();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOnePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await services.getOnePayment({ id });
        return res.status(200).json(response);
    } catch (error) {
        if (error.success === false) {
            return res.status(404).json({
                error: true,
                message: "Role not found",
            });
        }
        return internalServerError(res);
    }
};

export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.updatePayment(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.deletePayment({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
