import bcrypt from "bcryptjs";
import { generateAccessToken } from "../middlewares/generateToken";
import {
    registerRepository,
    loginRepository,
    getOneAuthRepository,
    finalRegisterRepository,
} from "../repositories/authRepository";
const makeToken = require("uniqid");
import sendMail from "../utils/sendmail";
const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const register = async ({
    email,
    password,
    firstName,
    lastName,
    avatar,
}) => {
    try {
        const token = makeToken();
        const emailEdited = btoa(email) + "@" + token;
        const newUser = {
            email: emailEdited,
            password: hashPassword(password),
            firstName,
            lastName,
            avatar,
        };
        const response = await registerRepository(newUser);
        if (response[1]) {
            const html = `<h2>Register code : </h2> <br/> <h1> ${token} </h1>`;
            const data = {
                email,
                html,
                subject: "Confirm your register",
            };
            await sendMail(data);
        }
        return {
            success: response[1] ? true : false,
            mes: response[1] ? "Please check your email" : "Register failed",
        };
    } catch (error) {
        return error;
    }
};

export const finalRegister = async (token) => {
    try {
        const notActiveEmail = await getOneAuthRepository(token);
        if (notActiveEmail) {
            notActiveEmail.email = atob(notActiveEmail?.email?.split("@")[0]);
            const response = await finalRegisterRepository(
                notActiveEmail.dataValues
            );
            console.log(response.length);
            return {
                success: response.length > 0 ? true : false,
                mes:
                    response.length > 0
                        ? "Register successfully"
                        : "Register failed",
            };
        }
    } catch (error) {
        return error;
    }
};

export const login = async ({ email, password }) => {
    try {
        const response = await loginRepository({ email });
        const isChecked =
            response && bcrypt.compareSync(password, response.password);
        const token = isChecked
            ? generateAccessToken(
                  response.id,
                  response.firstName,
                  response.lastName,
                  response.email,
                  response.roleId
              )
            : null;

        return {
            success: response ? true : false,
            data: token ? response : "Login failed",
            access_token: token,
        };
    } catch (error) {
        return error;
    }
};
// authorize
