import db from "../../models";

export const createProductRepository = async ({
    title,
    description,
    brandId,
    categoryId,
    price,
}) => {
    const data = await db.Product.findOrCreate({
        where: { title },
        defaults: {
            title,
            description,
            brandId,
            categoryId,
            price,
        },
    });
    return data;
};

export const getAllProductRepository = async () => {
    const data = await db.Product.findAll({
        attributes: {
            exclude: ["brandId", "categoryId", "createdAt", "updatedAt"],
        },
        include: [
            {
                model: db.Category,
                as: "category",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Brand,
                as: "brand",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.ProductSize,
                as: "productSize",
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "productId",
                        "colorId",
                        "capacityId",
                    ],
                },
                include: [
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
            },
            {
                model: db.Image,
                as: "image",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "productId"],
                },
            },
        ],
    });
    return data;
};

export const getOneProductRepository = async ({ productId }) => {
    const data = await db.Product.findOne({
        where: { id: productId },
        attributes: {
            exclude: ["brand", "category", "createdAt", "updatedAt"],
        },
        include: [
            {
                model: db.Category,
                as: "category",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Brand,
                as: "brand",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.ProductSize,
                as: "productSize",
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "productId",
                        "colorId",
                        "capacityId",
                    ],
                },
                include: [
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
            },
            {
                model: db.Image,
                as: "image",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "productId"],
                },
            },
        ],
    });
    return data;
};

export const updateProductRepository = async (productId, body) => {
    const data = await db.Product.update(body, {
        where: {
            id: productId,
        },
    });
    return data;
};

export const deleteProductRepository = async ({ productId }) => {
    const data = await db.Product.destroy({
        where: { id: productId },
    });
    return data;
};
