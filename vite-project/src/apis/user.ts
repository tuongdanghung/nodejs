import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiGetAllUer = (params: any) =>
    axios({
        url: "/users",
        method: "GET",
        params: { email: params },
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetOneUser = (token: any) =>
    axios({
        url: `/users/me`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
export const apiRegister = (data: object) =>
    axios({
        url: "/auth/register",
        method: "POST",
        data: data,
        headers: {
            "Content-Type": "application/json",
        },
    });

export const apiLogin = (data: object) =>
    axios({
        url: "/auth/login",
        method: "POST",
        // withCredentials: true,
        data: data,
    });

export const apiFinalRegister = (params: string) =>
    axios({
        url: `/auth/finalRegister/${params}`,
        method: "PUT",
    });

export const apiUpdateUser = (data: any) =>
    axios({
        url: `/users/update`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateUserByAdmin = (data: any) =>
    axios({
        url: `/users/updateByAdmin/${data.id}`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${data.token}` },
    });

export const apiCreateCart = (data: any) =>
    axios({
        url: `/cart`,
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateCart = (data: any) =>
    axios({
        url: `/cart/${data.id}`,
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiOrderCart = (data: any) =>
    axios({
        url: `/orderItem`,
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetCartByUser = (token: any) =>
    axios({
        url: `/cart/getAllCartByUser`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteCart = (data: any) =>
    axios({
        url: `/cart/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiForgotPassword = (data: any) =>
    axios({
        url: "/users/forgotpassword",
        method: "POST",
        data: data,
    });
export const apiResetToken = (data: any) =>
    axios({
        url: "/users/resetpassword",
        method: "PUT",
        data: data,
    });
