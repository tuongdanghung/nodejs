import db from "../models";
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
export const createOrderRepository = async (body) => {
    const data = await db.Order.findOrCreate({
        where: {
            orderItemId: body.orderItemId,
        },
        defaults: {
            orderItemId: body.orderItemId,
            addressId: body.addressId,
            paymentId: body.paymentId,
            userId: body.userId,
        },
    });
    return data;
};

export const getAllOrderRepository = async () => {
    const data = await db.Order.findAll({
        include: [
            {
                model: db.User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "password"],
                },
            },
            {
                model: db.Address,
                as: "address",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Payment,
                as: "payment",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.OrderItem,
                as: "sp",
                include: [
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
                                            exclude: ["createdAt", "updatedAt"],
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
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "AddressId",
                        "paymentId",
                        "userId",
                        "addressId",
                        "productSizeId",
                    ],
                },
            },
        ],
        attributes: {
            exclude: [
                "createdAt",
                "updatedAt",
                "AddressId",
                "paymentId",
                "userId",
                "addressId",
            ],
        },
    });
    return data;
};

// export const getAllOrderByUserRepository = async (id) => {
//     console.log(id);
//     const data = await db.Order.findAll({
//         where: { userId: id },

//         attributes: {
//             exclude: [
//                 "createdAt",
//                 "updatedAt",
//                 "AddressId",
//                 "paymentId",
//                 // "userId",
//                 "addressId",
//             ],
//         },
//     });
//     console.log(data);
//     return data;
// };
export const getAllOrderByUserRepository = async ({ id }) => {
    const data = await db.Order.findAll({
        where: { userId: id },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
        include: [
            {
                model: db.User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Address,
                as: "address",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.Payment,
                as: "payment",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            },
            {
                model: db.OrderItem,
                as: "sp",
                include: [
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
                                            exclude: ["createdAt", "updatedAt"],
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
                attributes: {
                    exclude: [
                        "createdAt",
                        "updatedAt",
                        "AddressId",
                        "paymentId",
                        "userId",
                        "addressId",
                        "productSizeId",
                    ],
                },
            },
        ],
    });
    return data;
};

export const updateOrderRepository = async (id, body) => {
    const data = await db.Order.update(body, {
        where: { id },
    });
    return data;
};
