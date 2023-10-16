import db from "../../models";

export const createBrandRepository = async ({ title }) => {
    const data = await db.Brand.findOrCreate({
        where: { title },
        defaults: { title },
    });
    return data;
};

export const getAllBrandRepository = async () => {
    const data = await db.Brand.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const getOneBrandRepository = async ({ brandId }) => {
    const data = await db.Brand.findOne({
        where: { id: brandId },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const updateBrandRepository = async (brandId, body) => {
    const data = await db.Brand.update(body, {
        where: {
            id: brandId,
        },
    });
    return data;
};

export const deleteBrandRepository = async ({ brandId }) => {
    const data = await db.Brand.destroy({
        where: { id: brandId },
    });
    return data;
};
