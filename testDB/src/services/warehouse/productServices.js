import {
    createProductRepository,
    getAllProductRepository,
    getOneProductRepository,
    updateProductRepository,
    deleteProductRepository,
} from "../../repositories/warehouse/productRepository";
import { createImageRepository } from "../../repositories/warehouse/imageRepository";
import { createProductSizeRepository } from "../../repositories/warehouse/productSizeRepository";
export const createProduct = async (
    { title, description, brandId, categoryId, price, stock },
    image,
    colorId,
    capacityId
) => {
    try {
        const response = await createProductRepository({
            title,
            description,
            brandId,
            categoryId,
            price,
            stock,
        });
        for (const item of image) {
            const createImage = {
                productId: response[0].dataValues.id,
                src: item.src,
            };
            await createImageRepository(createImage);
        }
        let hasSuccess = false;
        for (const capacity of capacityId) {
            for (const color of colorId) {
                const item = {
                    productId: response[0].dataValues.id,
                    capacityId: capacity,
                    colorId: color,
                };
                try {
                    const response = await createProductSizeRepository({
                        productId: item.productId,
                        capacityId: item.capacityId,
                        colorId: item.colorId,
                    });
                    const success = response[1] === true ? true : false;
                    if (success) {
                        hasSuccess = true;
                    }
                } catch (error) {
                    throw error;
                }
            }
        }
        return {
            success: response[1] === true ? true : false,
            message:
                response[1] === true
                    ? "Create product successfully"
                    : "Product is available",
        };
    } catch (error) {
        return error;
    }
};

export const getAllProduct = async () => {
    try {
        const response = await getAllProductRepository();
        const products = response.map((product) => {
            const { productSize, ...rest } = product.dataValues;
            const capacities = [];
            const colors = [];
            const capacitySet = new Set();
            const colorSet = new Set();

            productSize.forEach((ps) => {
                const { capacity, color } = ps;
                if (!capacitySet.has(capacity.id)) {
                    capacities.push(capacity.dataValues);
                    capacitySet.add(capacity.id);
                }
                if (!colorSet.has(color.id)) {
                    colors.push(color.dataValues);
                    colorSet.add(color.id);
                }
            });

            return {
                ...rest,
                productSize: {
                    capacities,
                    colors,
                },
            };
        });
        return {
            success: true,
            data: products,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getOneProduct = async ({ productId }) => {
    try {
        const response = await getOneProductRepository({ productId });
        const capacityArray = response.productSize.map(
            (item) => item.dataValues.capacity
        );
        const colorArray = response.productSize.map(
            (item) => item.dataValues.color
        );
        const uniqueCapacityArray = capacityArray.filter(
            (item, index, self) =>
                self.findIndex((t) => t.id === item.id) === index
        );
        const uniqueColorArray = colorArray.filter(
            (item, index, self) =>
                self.findIndex((t) => t.id === item.id) === index
        );
        response.dataValues.productSize = {
            capacity: uniqueCapacityArray,
            color: uniqueColorArray,
        };
        return {
            success: true,
            data: response.dataValues,
        };
    } catch (error) {
        return error;
    }
};

export const updateProduct = async (productId, body) => {
    try {
        const response = await updateProductRepository(productId, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Updated product successfully`
                    : `Updated product failed`,
        };
    } catch (error) {
        return error;
    }
};

export const deleteProduct = async (productId, body) => {
    const data = {
        active: body.active,
    };
    try {
        const response = await updateProductRepository(productId, data);
        return {
            success: response > 0 ? true : false,
            message: `Delete successfully`,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};

const data = {
    success: true,
    data: [
        {
            id: 1,
            title: "Iphone 13",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            price: 1250,
            category: {
                id: 2,
                title: "Apple",
            },
            brand: {
                id: 2,
                title: "Apple",
            },
            productSize: [
                {
                    // id: 4,
                    // productId: 1,
                    // colorId: 2,
                    // capacityId: 2,
                    capacity: {
                        id: 2,
                        size: 64,
                        percent: 5,
                    },
                    color: {
                        id: 2,
                        color: "blue",
                    },
                },
                {
                    id: 3,
                    productId: 1,
                    colorId: 1,
                    capacityId: 2,
                    capacity: {
                        id: 2,
                        size: 64,
                        percent: 5,
                    },
                    color: {
                        id: 1,
                        color: "red",
                    },
                },
                {
                    id: 2,
                    productId: 1,
                    colorId: 2,
                    capacityId: 1,
                    capacity: {
                        id: 1,
                        size: 32,
                        percent: 10,
                    },
                    color: {
                        id: 2,
                        color: "blue",
                    },
                },
                {
                    id: 1,
                    productId: 1,
                    colorId: 1,
                    capacityId: 1,
                    capacity: {
                        id: 1,
                        size: 32,
                        percent: 10,
                    },
                    color: {
                        id: 1,
                        color: "red",
                    },
                },
            ],
        },
    ],
};
