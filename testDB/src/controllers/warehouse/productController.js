import * as services from "../../services";
import { internalServerError } from "../../middlewares/handleErrors";

export const createProduct = async (req, res) => {
    const image = req?.files?.map((el) => ({ src: el.path }));
    const product = {
        title: req.body.title,
        price: +req.body.price,
        description: req.body.description,
        brandId: +req.body.brand,
        categoryId: +req.body.category,
        stock: +req.body.stock,
    };
    const color = JSON.parse(req.body.color);
    const capacity = JSON.parse(req.body.capacity);
    try {
        const response = await services.createProduct(
            product,
            image,
            color,
            capacity
        );
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getAllProduct = async (req, res) => {
    try {
        const response = await services.getAllProduct();
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const getOneProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const response = await services.getOneProduct({ productId });
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const response = await services.updateProduct(productId, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const response = await services.deleteProduct(productId, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res);
    }
};
