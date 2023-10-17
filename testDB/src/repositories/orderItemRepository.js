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
