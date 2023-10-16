import db from "../models";

export const createFavouriteRepository = async ({ productSizeId, userId }) => {
    const data = await db.Favourite.findOrCreate({
        where: {
            productSizeId,
            userId,
        },
        defaults: {
            productSizeId,
            userId,
        },
    });
    return data;
};

export const getAllFavouriteRepository = async () => {
    const data = await db.Favourite.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt", "userId", "productSizeId"],
        },
        include: [
            {
                model: db.User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
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
                        model: db.Product,
                        as: "product",
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "brandId",
                                "categoryId",
                            ],
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
                                model: db.Image,
                                as: "image",
                                attributes: {
                                    exclude: [
                                        "createdAt",
                                        "updatedAt",
                                        "productId",
                                    ],
                                },
                            },
                        ],
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
            },
        ],
    });
    return data;
};

export const getAllFavouriteByUserRepository = async ({ id }) => {
    const data = await db.Favourite.findAll({
        where: { userId: id },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
        include: [
            {
                model: db.User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
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
                        model: db.Product,
                        as: "product",
                        attributes: {
                            exclude: [
                                "createdAt",
                                "updatedAt",
                                "brandId",
                                "categoryId",
                            ],
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
                                model: db.Image,
                                as: "image",
                                attributes: {
                                    exclude: [
                                        "createdAt",
                                        "updatedAt",
                                        "productId",
                                    ],
                                },
                            },
                        ],
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
            },
        ],
    });
    return data;
};

export const deleteFavouriteRepository = async ({ id }) => {
    const data = await db.Favourite.destroy({
        where: { id },
    });
    return data;
};
