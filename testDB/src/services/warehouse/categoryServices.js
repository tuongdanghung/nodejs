import {
    createCategoryRepository,
    getAllCategoryRepository,
    getOneCategoryRepository,
    updateCategoryRepository,
    deleteCategoryRepository,
} from "../../repositories/warehouse/categoryRepository";
export const createCategory = async ({ title }) => {
    try {
        const response = await createCategoryRepository({ title });
        return {
            success: response[1] === true ? true : false,
            message:
                response[1] === true
                    ? "Create category successfully"
                    : "Category is available",
        };
    } catch (error) {
        return error;
    }
};

export const getAllCategory = async () => {
    try {
        const response = await getAllCategoryRepository();
        const category = response.map((category) => category.toJSON());
        return {
            success: true,
            data: category,
        };
    } catch (error) {
        return error;
    }
};

export const getOneCategory = async ({ categoryId }) => {
    try {
        const response = await getOneCategoryRepository({ categoryId });
        return {
            success: true,
            data: response.dataValues,
        };
    } catch (error) {
        return error;
    }
};

export const updateCategory = async (categoryId, body) => {
    try {
        const response = await updateCategoryRepository(categoryId, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Category updated successfully`
                    : `Category updated failed`,
        };
    } catch (error) {
        return error;
    }
};

export const deleteCategory = async ({ categoryId }) => {
    try {
        const response = await deleteCategoryRepository({ categoryId });
        return {
            success: response > 0 ? true : false,
            message: `Delete successfully`,
        };
    } catch (error) {
        return error;
    }
};
