import * as services from "../services";
import { internalServerError } from "../middlewares/handleErrors";
export const getAllUser = async (req, res) => {
    try {
        const response = await services.getAllUser();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneUser = async (req, res) => {
    const { id } = req.user;
    try {
        const response = await services.getOneUser({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.user;
        const avatar = req?.file?.path;
        const response = await services.updateUser(id, {
            ...req.body,
            avatar,
        });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
export const updateByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.updateByAdmin(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

// READ
