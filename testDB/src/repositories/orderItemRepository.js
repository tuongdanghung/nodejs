import db from "../models";
const { Op } = require("sequelize");
export const createOrderItemRepository = async (body, idCart) => {
    const data = await db.OrderItem.bulkCreate(body);

    // await db.Cart.destroy({
    //     where: {
    //         id: {
    //             [Op.in]: idCart,
    //         },
    //     },
    // });
    return data;
};

export const getAllOrderItemRepository = async () => {
    const data = await db.OrderItem.findAll({
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
            {
                model: db.Order,
                as: "order",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
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
                "productSizeId",
            ],
        },
    });
    return data;
};
