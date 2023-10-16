import * as services from "../../services";
import { internalServerError } from "../../middlewares/handleErrors";

export const createCapacity = async (req, res) => {
  try {
    const response = await services.createCapacity(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const getAllCapacity = async (req, res) => {
  try {
    const response = await services.getAllCapacity();
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const getOneCapacity = async (req, res) => {
  const { capacityId } = req.params;
  try {
    const response = await services.getOneCapacity({ capacityId });
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const updateCapacity = async (req, res) => {
  try {
    const { capacityId } = req.params;
    const response = await services.updateCapacity(capacityId, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const deleteCapacity = async (req, res) => {
  try {
    const { capacityId } = req.params;
    const response = await services.deleteCapacity({ capacityId });
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
