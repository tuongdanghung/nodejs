import db from "../models";
import { Op } from "sequelize";

export const registerRepository = async (body) => {
    const data = await db.User.findOrCreate({
        where: { email: body.email },
        defaults: {
            email: body.email,
            password: body.password,
            firstName: body.firstName,
            lastName: body.firstName,
            avatar: body.avatar,
        },
    });
    return data;
};

export const getOneAuthRepository = async ({ token }) => {
    const data = await db.User.findOne({
        where: { email: { [Op.like]: `%${token}` } },
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "role"],
        },
    });
    return data;
};

export const finalRegisterRepository = async (body) => {
    const data = await db.User.update(
        {
            email: body.email,
        },
        {
            where: { id: body.id },
        }
    );
    return data;
};

export const loginRepository = async ({ email }) => {
    const data = await db.User.findOne({
        where: { email },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        raw: true,
    });
    return data;
};
