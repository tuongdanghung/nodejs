import {
    createPaymentRepository,
    getAllPaymentRepository,
    getOnePaymentRepository,
    updatePaymentRepository,
    deletePaymentRepository,
} from "../repositories/paymentRepository";
export const createPayment = async ({ method }) => {
    try {
        const response = await createPaymentRepository({ method });
        return {
            success: response[1] === true ? true : false,
            message:
                response[1] === true
                    ? "Create role successfully"
                    : "Role is available",
        };
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllPayment = async () => {
    try {
        const response = await getAllPaymentRepository();
        const roles = response.map((role) => role.toJSON());
        return {
            success: true,
            data: roles,
        };
    } catch (error) {
        throw error;
    }
};

export const getOnePayment = async ({ id }) => {
    try {
        const response = await getOnePaymentRepository({ id });
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

export const updatePayment = async (id, body) => {
    try {
        const response = await updatePaymentRepository(id, body);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? "Updated payment successfully"
                    : "Payment not found",
        };
    } catch (error) {
        return error;
    }
};

export const deletePayment = ({ id }) => {
    try {
        const response = deletePaymentRepository({ id });
        return {
            success: response > 0 ? true : false,
            message: `Delete payment successfully`,
        };
    } catch (error) {
        return error;
    }
};
