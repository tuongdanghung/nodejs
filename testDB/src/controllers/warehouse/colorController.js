import * as services from "../../services";
import { internalServerError } from "../../middlewares/handleErrors";

export const createColor = async (req, res) => {
    try {
        const response = await services.createColor(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllColor = async (req, res) => {
    try {
        const response = await services.getAllColor();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneColor = async (req, res) => {
    const { colorId } = req.params;
    try {
        const response = await services.getOneColor({ colorId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateColor = async (req, res) => {
    try {
        const { colorId } = req.params;
        const response = await services.updateColor(colorId, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteColor = async (req, res) => {
    try {
        const { colorId } = req.params;
        const response = await services.deleteColor({ colorId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
