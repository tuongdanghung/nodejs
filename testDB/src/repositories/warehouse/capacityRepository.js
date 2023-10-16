import db from "../../models";

export const createCapacityRepository = async ({ size, percent }) => {
    const data = await db.Capacity.findOrCreate({
        where: { size },
        defaults: { size, percent },
    });
    return data;
};

export const getAllCapacityRepository = async () => {
    const data = await db.Capacity.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const getOneCapacityRepository = async ({ capacityId }) => {
    const data = await db.Capacity.findOne({
        where: { id: capacityId },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const updateCapacityRepository = async (capacityId, body) => {
    const data = await db.Capacity.update(body, {
        where: {
            id: capacityId,
        },
    });
    return data;
};

export const deleteCapacityRepository = async ({ capacityId }) => {
    const data = await db.Capacity.destroy({
        where: { id: capacityId },
    });
    return data;
};
