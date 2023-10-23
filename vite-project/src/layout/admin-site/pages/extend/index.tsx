import React, { useEffect, useState } from "react";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";
import { Outlet } from "react-router-dom";
import { Nav } from "../../components";
import { AppDispatch } from "../../../../store";
import { GetOneUser } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as io from "socket.io-client";
import pathAdmin from "./../../utils/path";
import { ToastContainer, toast } from "react-toastify";
const socket = io.connect("http://localhost:5000");

const ExtendAdmin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("auth");
    const user = useSelector((state: any) => state?.userReducer?.oneUser?.data);
    useEffect(() => {
        dispatch(GetOneUser(token));
        socket.on("receive_message", (data) => {
            toast.success(" Have a new order", {
                onClick: () => {
                    navigate(pathAdmin.MANAGER_ORDER);
                },
            });
        });
    }, []);

    const checkRole = user?.roleId;

    return (
        <>
            {checkRole === 1 ? (
                <div className="flex w-full">
                    <Notifications />
                    <div className="w-1/6">
                        <Nav />
                    </div>
                    <div className="w-5/6">
                        <Outlet />
                    </div>
                </div>
            ) : (
                navigate("/")
            )}
            <ToastContainer />
        </>
    );
};

export default ExtendAdmin;
