import db from "../models";

export const createPaymentRepository = async ({ method }) => {
    const data = await db.Payment.findOrCreate({
        where: { method },
        defaults: { method },
    });
    return data;
};

export const getAllPaymentRepository = async () => {
    const data = await db.Payment.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const getOnePaymentRepository = async ({ id }) => {
    const data = await db.Payment.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const updatePaymentRepository = async (id, body) => {
    const data = await db.Payment.update(body, {
        where: { id },
    });
    return data;
};

export const deletePaymentRepository = async ({ id }) => {
    const data = await db.Payment.destroy({
        where: { id },
    });
    return data;
};
