import {
    getAllUserRepository,
    getOneUserRepository,
    updateUserRepository,
    updateByAdminRepository,
    getOneUserForgotRepository,
} from "../repositories/userRepository";
import bcrypt from "bcryptjs";
import sendMail from "../utils/sendmail";
const makeToken = require("uniqid");
const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
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

export const forgotPasswordServices = async ({ email }) => {
    try {
        const response = await getOneUserForgotRepository({ email });
        if (response === null) {
            return {
                success: false,
                data: "Missing input",
            };
        }
        const token = makeToken();
        const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.
    Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=http://127.0.0.1:3000/reset-password/${response.id}+${token}>
    Click here</a>`;
        const data = {
            email,
            html,
            subject: "Forgot Password",
        };
        const rs = await sendMail(data);
        return res.status(200).json({
            success: true,
            message: "Please your check mail",
        });
    } catch (error) {
        return error;
    }
};

export const resetPasswordServices = async (body) => {
    const id = body.token.split("+")[0];

    const newPassword = {
        password: hashPassword(body.password),
    };
    const response = await updateUserRepository(+id, newPassword);
    return {
        success: response > 0 ? true : false,
        message: response > 0 ? `User updated successfully` : `User not found`,
    };
};
