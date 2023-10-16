import db from "../../models";

export const createImageRepository = async ({ src, productId }) => {
    const data = await db.Image.findOrCreate({
        where: { src },
        defaults: { src, productId },
    });
    return data;
};

export const getAllImageRepository = async () => {
    const data = await db.Image.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
        include: [
            {
                model: db.Product,
                as: "product",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        ],
    });
    return data;
};

export const getOneImageRepository = async ({ id }) => {
    const data = await db.Image.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
        include: [
            {
                model: db.Product,
                as: "product",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        ],
    });
    return data;
};

export const updateImageRepository = async (id, body) => {
    const data = await db.Image.update(
        { src: body },
        {
            where: { id },
        }
    );
    return data;
};

export const deleteImageRepository = async ({ id }) => {
    const data = await db.Image.destroy({
        where: { id },
    });
    return data;
};
