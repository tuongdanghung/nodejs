import axios from "../config/axios";
const token = localStorage.getItem("auth");
export const apiCreateProduct = (data: any) =>
    axios({
        url: "/product",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllProduct = (data: any) =>
    axios({
        url: `/product`,
        params: data,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiProductDetail = (detail: any) =>
    axios({
        url: `/product/${detail.id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteProduct = (data: any) =>
    axios({
        url: `/product/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiEditProduct = (data: any, id: any) =>
    axios({
        url: `/product/${id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });

// product
export const apiCreateCapacity = (data: any) =>
    axios({
        url: "/capacity",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllCapacity = (data: any) =>
    axios({
        url: "/capacity",
        params: data,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiEditCapacity = (data: any) =>
    axios({
        url: `/capacity/${data.id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteCapacity = (data: any) =>
    axios({
        url: `/capacity/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
// capacity
export const apiCreateColor = (data: any) =>
    axios({
        url: "/color",
        method: "POST",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllColor = (data: any) =>
    axios({
        url: "/color",
        method: "GET",
        params: data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiDeleteColor = (data: any) =>
    axios({
        url: `/color/${data.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiEditColor = (data: any) =>
    axios({
        url: `/color/${data.id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });
// color

export const apiUpdateProductSize = (data: any) =>
    axios({
        url: "/productSize",
        method: "PUT",
        data: data,
        headers: { Authorization: `Bearer ${token}` },
    });
export const getAllProductSize = (data:any) =>
    axios({
        url: "/productSize",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
