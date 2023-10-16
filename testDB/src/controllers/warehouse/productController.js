import * as services from "../../services";
import { internalServerError } from "../../middlewares/handleErrors";

export const createProduct = async (req, res) => {
    try {
        const response = await services.createProduct(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllProduct = async (req, res) => {
    try {
        const response = await services.getAllProduct();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await services.getOneProduct({ productId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(req);
        const response = await services.updateProduct(productId, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const response = await services.deleteProduct({ productId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
