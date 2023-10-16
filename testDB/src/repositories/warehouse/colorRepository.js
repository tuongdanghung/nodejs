import db from "../../models";

export const createColorRepository = async ({ color }) => {
    const data = await db.Color.findOrCreate({
        where: { color },
        defaults: {
            color,
        },
    });
    return data;
};

export const getAllColorRepository = async () => {
    const data = await db.Color.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const getOneColorRepository = async ({ colorId }) => {
    const data = await db.Color.findOne({
        where: { id: colorId },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const updateColorRepository = async (colorId, body) => {
    const data = await db.Color.update(body, {
        where: {
            id: colorId,
        },
    });
    return data;
};

export const deleteColorRepository = async ({ colorId }) => {
    const data = await db.Color.destroy({
        where: { id: colorId },
    });
    return data;
};
