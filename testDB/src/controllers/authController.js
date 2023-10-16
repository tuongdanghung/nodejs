import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handleErrors";
import { firstName, lastName, email, password } from "../helpers/joi_schema";
import joi from "joi";

export const register = async (req, res) => {
    try {
        const avatar = "https://psce.pw/59lc4t";
        const { error } = joi
            .object({ firstName, lastName, email, password })
            .validate(req.body);
        if (error) return badRequest(error.details[0]?.message, res);
        const response = await services.register({ ...req.body, avatar });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const finalRegister = async (req, res) => {
    const { token } = req.params;
    const response = await services.finalRegister({ token });
    return res.status(200).json(response);
};

export const login = async (req, res) => {
    try {
        const { error } = joi.object({ email, password }).validate(req.body);
        if (error) {
            return badRequest(error.details[0].message, res);
        }
        const response = await services.login(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
