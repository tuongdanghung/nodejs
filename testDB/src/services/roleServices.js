import {
    getAllRoleRepository,
    createRoleRepository,
    getOneRoleRepository,
    updateRoleRepository,
    deleteRoleRepository,
} from "../repositories/roleRepository";
export const createRole = async ({ code }) => {
    try {
        const response = await createRoleRepository({ code });
        return {
            success: response[1] === true ? true : false,
            message:
                response[1] === true
                    ? "Create role successfully"
                    : "Role is available",
        };
    } catch (error) {
        return error;
    }
};

export const getAllRole = async () => {
    try {
        const response = await getAllRoleRepository();
        const roles = response.map((role) => role.toJSON());
        return {
            success: true,
            data: roles,
        };
    } catch (error) {
        throw error;
    }
};

export const getOneRole = async ({ id }) => {
    try {
        const response = await getOneRoleRepository({ id });
        if (response?.dataValues === undefined) {
            return {
                success: false,
            };
        }
        return {
            success: true,
            data: response?.dataValues,
        };
    } catch (error) {
        return error;
    }
};

export const updateRole = async (id, body) => {
    try {
        const response = await updateRoleRepository(id, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0 ? "Updated role successfully" : "Role not found",
        };
    } catch (error) {
        return error;
    }
};

export const deleteRole = ({ id }) => {
    try {
        const response = deleteRoleRepository({ id });
        return {
            success: response > 0 ? true : false,
            message: `Delete role successfully`,
        };
    } catch (error) {
        return error;
    }
};
