import axios from "../config/axios";
const token = localStorage.getItem("auth");

export const apiCreateOrderItem = () =>
    axios({
        url: "/orderItem",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiCreateOrder = (data: any) =>
    axios({
        url: "/order",
        method: "POST",
        data,
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetAllOrder = (token: string) =>
    axios({
        url: "/order",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiGetOrderByUser = (token: string) =>
    axios({
        url: "/order/history",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

export const apiUpdateOrder = (data: any) =>
    axios({
        url: `/order/${data.id}`,
        data: data,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });
