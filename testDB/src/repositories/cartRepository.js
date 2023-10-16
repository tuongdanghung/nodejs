import db from "../models";

export const createCartRepository = async ({
    productSizeId,
    userId,
    quantity,
}) => {
    const data = await db.Cart.findOrCreate({
        where: {
            productSizeId,
            userId,
        },
        defaults: {
            productSizeId,
            userId,
            quantity,
        },
    });
    return data;
};

export const getAllCartRepository = async () => {
    const data = await db.Cart.findAll({
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

export const getAllCartByUserRepository = async ({ id }) => {
    const data = await db.Cart.findAll({
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

export const getOneCartRepository = async ({ id }) => {
    const data = await db.Cart.findOne({
        where: { id },
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

export const updateCartRepository = async (id, body) => {
    const data = await db.Cart.update(body, {
        where: { id },
    });
    return data;
};

export const deleteCartRepository = async ({ id }) => {
    const data = await db.Cart.destroy({
        where: { id },
    });
    return data;
};
