import * as services from "../../services";
import { internalServerError } from "../../middlewares/handleErrors";

export const createImage = async (req, res) => {
    try {
        const data = req?.files?.map((el) => ({ src: el.path, ...req.body }));
        const response = await services.createImage(data);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllImage = async (req, res) => {
    try {
        const response = await services.getAllImage();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneImage = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await services.getOneImage({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const src = req.file.path;
        const response = await services.updateImage(id, src);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await services.deleteImage({ id });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
