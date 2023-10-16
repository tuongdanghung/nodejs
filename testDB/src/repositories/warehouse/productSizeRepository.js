import db from "../../models";

export const createProductSizeRepository = async ({
    productId,
    capacityId,
    colorId,
}) => {
    const data = await db.ProductSize.findOrCreate({
        where: {
            productId,
            capacityId,
            colorId,
        },
        defaults: {
            productId,
            capacityId,
            colorId,
        },
    });
    return data;
};

export const getAllProductSizeRepository = async () => {
    const data = await db.ProductSize.findAll({
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
            {
                model: db.Capacity,
                as: "capacity",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Color,
                as: "color",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        ],
    });
    return data;
};

export const getOneProductSizeRepository = async ({ id }) => {
    const data = await db.ProductSize.findOne({
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
            {
                model: db.Capacity,
                as: "capacity",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Color,
                as: "color",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
        ],
    });
    return data;
};

export const updateProductSizeRepository = async (brandId, body) => {
    const data = await db.Brand.update(body, {
        where: {
            id: brandId,
        },
    });
    return data;
};

export const deleteProductSizeRepository = async ({ brandId }) => {
    const data = await db.Brand.destroy({
        where: { id: brandId },
    });
    return data;
};
