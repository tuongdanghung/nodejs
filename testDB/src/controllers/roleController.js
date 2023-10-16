import * as services from "../services";
import { internalServerError } from "../middlewares/handleErrors";

export const createRole = async (req, res) => {
    try {
        const response = await services.createRole(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllRole = async (req, res) => {
    try {
        const response = await services.getAllRole();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneRole = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await services.getOneRole({ id });
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

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.updateRole(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.deleteRole({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
