import {
    getAllUserRepository,
    getOneUserRepository,
    updateUserRepository,
    updateByAdminRepository,
} from "../repositories/userRepository";
export const getAllUser = async () => {
    try {
        const response = await getAllUserRepository();
        const users = response.map((user) => user.toJSON());
        return {
            success: true,
            data: users,
        };
    } catch (error) {
        return error;
    }
};

export const getOneUser = async ({ id }) => {
    try {
        const response = await getOneUserRepository({ id });
        return {
            success: true,
            data: response.dataValues,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateUser = async (id, body) => {
    const userCredentials = {
        ...(body.firstName && { firstName: body.firstName }),
        ...(body.lastName && { lastName: body.lastName }),
        ...(body.email && { email: body.email }),
        ...(body.avatar && { avatar: body.avatar }),
        ...(body.password && { avatar: body.avatar }),
    };

    try {
        const response = await updateUserRepository(id, userCredentials);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0 ? `User updated successfully` : `User not found`,
        };
    } catch (error) {
        return error;
    }
};

export const updateByAdmin = async (id, body) => {
    try {
        const response = await updateByAdminRepository(id, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0 ? `User updated successfully` : `User not found`,
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};
