import db from "../models";

export const createRoleRepository = async ({ code }) => {
    const data = await db.Role.findOrCreate({
        where: { code },
        defaults: { code },
    });
    return data;
};

export const getAllRoleRepository = async () => {
    const data = await db.Role.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const getOneRoleRepository = async ({ id }) => {
    const data = await db.Role.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const updateRoleRepository = async (id, body) => {
    const data = await db.Role.update(body, {
        where: { id },
    });
    return data;
};

export const deleteRoleRepository = async ({ id }) => {
    const data = await db.Role.destroy({
        where: { id },
    });
    return data;
};
