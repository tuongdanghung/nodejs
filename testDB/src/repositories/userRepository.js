import db from "../models";

export const getAllUserRepository = async () => {
    const data = await db.User.findAll({
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "roleId"],
        },
        include: [
            {
                model: db.Role,
                as: "role",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Address,
                as: "address",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        ],
    });
    return data;
};

export const getOneUserRepository = async ({ id }) => {
    const data = await db.User.findOne({
        where: { id: id },
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "role"],
        },
        include: [
            {
                model: db.Role,
                as: "role",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Address,
                as: "address",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        ],
    });
    return data;
};

export const getOneUserForgotRepository = async ({ email }) => {
    const data = await db.User.findOne({
        where: { email },
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "role"],
        },
    });
    return data;
};

export const updateUserRepository = async (id, body) => {
    console.log(id, body);
    const data = await db.User.update(body, {
        where: { id },
    });
    return data;
};

export const updateByAdminRepository = async (id, body) => {
    const data = await db.User.update(body, {
        where: { id },
    });
    return data;
};
