import db from "../models";

export const createAddressRepository = async ({
    province,
    district,
    ward,
    userId,
    phone,
}) => {
    const data = await db.Address.findOrCreate({
        where: { province, district, ward, userId, phone },
        defaults: {
            province,
            district,
            ward,
            userId,
            phone,
        },
    });
    return data;
};

export const getAllAddressRepository = async () => {
    const data = await db.Address.findAll({
        include: [
            {
                model: db.User,
                as: "user",
                include: {
                    model: db.Role,
                    as: "role",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "roleId"],
                    },
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "roleId"],
                },
            },
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt", "userId"],
        },
    });
    return data;
};

export const getOneAddressRepository = async ({ id }) => {
    const data = await db.Address.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const updateAddressRepository = async (id, body) => {
    console.log(id, body);
    const data = await db.Address.update(body, {
        where: { id },
    });
    console.log(data);
    return data;
};

export const deleteAddressRepository = async ({ id }) => {
    const data = await db.Address.destroy({
        where: { id },
    });
    return data;
};
