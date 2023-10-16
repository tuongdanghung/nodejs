import * as services from "../../services";
import { internalServerError } from "../../middlewares/handleErrors";

export const createCategory = async (req, res) => {
    try {
        const response = await services.createCategory(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllCategory = async (req, res) => {
    try {
        const response = await services.getAllCategory();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneCategories = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const response = await services.getOneCategory({ categoryId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const response = await services.updateCategory(categoryId, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const response = await services.deleteCategory({ categoryId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
