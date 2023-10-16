import joi from "joi";

export const firstName = joi.string().required();
export const lastName = joi.string().required();

export const email = joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required();

export const password = joi.string().min(6).required();

export const phone = joi.number().required();

export const title = joi.string().required();

export const price = joi.number().required();

export const available = joi.number().required();

export const category_code = joi.string().uppercase().alphanum().required();

export const image = joi.string().required();

export const bookId = joi.string().required();

export const bookIds = joi.array().required();

export const filename = joi.array().required();

export const description = joi.string().required();

export const refresh_token = joi.string().required();

export const city = joi.string().required();

export const nation = joi.string().required();

export const street = joi.string().required();

export const userId = joi.number().required();

export const address = joi.string().required();

export const userIds = joi.number().required();

export const fileDel = joi.array().required();
