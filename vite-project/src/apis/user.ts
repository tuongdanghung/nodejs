import configAxios from "../config/axios";
import axios from "axios";
const token = localStorage.getItem("auth");
export const apiGetAllUer = (params: any) =>
    configAxios({
        url: "/users",
        method: "GET",
        params: { email: params },
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetOneUser = (token: any) =>
    configAxios({
        url: `/users/me`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
export const apiRegister = (data: object) =>
    configAxios({
        url: "/auth/register",
        method: "POST",
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiLogin = (data: object) =>
    configAxios({
        url: "/auth/login",
        method: "POST",
        // withCredentials: true,
        data: data,
    });

export const apiFinalRegister = (params: string) =>
    configAxios({
        url: `/auth/finalRegister/${params}`,
        method: "PUT",
    });

export const apiUpdateUser = (data: any) =>
    configAxios({
        url: `/users/update`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateUserByAdmin = (data: any) =>
    configAxios({
        url: `/users/updateByAdmin/${data.id}`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${data.token}` },
    });

export const apiCreateCart = (data: any) =>
    configAxios({
        url: `/cart`,
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateCart = (data: any) =>
    configAxios({
        url: `/cart/${data.id}`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiOrderCart = (data: any) =>
    configAxios({
        url: `/orderItem`,
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetCartByUser = (token: any) =>
    configAxios({
        url: `/cart/getAllCartByUser`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteCart = (data: any) =>
    configAxios({
        url: `/cart/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiForgotPassword = (data: any) =>
    configAxios({
        url: "/users/forgotpassword",
        method: "POST",
        data: data,
    });
// export const apiResetToken = (data: any) =>
//     configAxios({
//         url: "/users/resetpassword",
//         method: "PUT",
//         data: data,
//     });

export const apiResetToken = (data: object) =>
    configAxios({
        url: "/users/resetpassword",
        method: "POST",
        // withCredentials: true,
        data: data,
    });
