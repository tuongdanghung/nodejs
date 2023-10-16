import * as services from "../../services";
import { internalServerError } from "../../middlewares/handleErrors";

export const createBrand = async (req, res) => {
    try {
        const response = await services.createBrand(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllBrand = async (req, res) => {
    try {
        const response = await services.getAllBrand();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneBrand = async (req, res) => {
    const { brandId } = req.params;
    try {
        const response = await services.getOneBrand({ brandId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        const response = await services.updateBrand(brandId, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteBrand = async (req, res) => {
    try {
        const { brandId } = req.params;
        const response = await services.deleteBrand({ brandId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
