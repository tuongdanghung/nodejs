import db from "../../models";

export const createCategoryRepository = async ({ title }) => {
    const data = await db.Category.findOrCreate({
        where: { title },
        defaults: { title },
    });
    return data;
};

export const getAllCategoryRepository = async () => {
    const data = await db.Category.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const getOneCategoryRepository = async ({ categoryId }) => {
    const data = await db.Category.findOne({
        where: { id: categoryId },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    });
    return data;
};

export const updateCategoryRepository = async (categoryId, body) => {
    const data = await db.Category.update(body, {
        where: {
            id: categoryId,
        },
    });
    return data;
};

export const deleteCategoryRepository = async ({ categoryId }) => {
    const data = await db.Category.destroy({
        where: { id: categoryId },
    });
    return data;
};
