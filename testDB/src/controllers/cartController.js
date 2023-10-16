import * as services from "../services";
import { internalServerError } from "../middlewares/handleErrors";

export const createCart = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await services.createCart({ ...req.body, userId: id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllCart = async (req, res) => {
    try {
        const response = await services.getAllCart();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllCartByUser = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await services.getAllCartByUser({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneCart = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await services.getOneCart({ id });
        return res.status(200).json(response);
    } catch (error) {
        if (error.success === false) {
            return res.status(404).json({
                error: true,
                message: "cart not found",
            });
        }
        return internalServerError(res);
    }
};

export const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.updateCart(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.deleteCart({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
