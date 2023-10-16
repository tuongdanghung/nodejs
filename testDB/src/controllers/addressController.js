import * as services from "../services";
import { internalServerError } from "../middlewares/handleErrors";

export const createAddress = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await services.createAddress({
            ...req.body,
            userId: id,
        });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllAddress = async (req, res) => {
    try {
        const response = await services.getAllAddress();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await services.getOneAddress({ id });
        return res.status(200).json(response);
    } catch (error) {
        if (error.success === false) {
            return res.status(404).json({
                error: true,
                message: "Address not found",
            });
        }
        return internalServerError(res);
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.updateAddress(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.deleteAddress({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
