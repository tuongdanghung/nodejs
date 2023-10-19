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
const socket = io.connect("http://localhost:5000");

const ExtendAdmin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [renderMessage, setRenderMessage] = useState<any>("");
    const token = localStorage.getItem("auth");
    const user = useSelector((state: any) => state?.userReducer?.oneUser?.data);
    useEffect(() => {
        dispatch(GetOneUser(token));
        socket.on("receive_message", (data) => {
            setRenderMessage(data);
            addNotification({
                title: "Have a new order",
                subtitle: "This is a subtitle",
                message: "This is a very long message",
                theme: "darkblue",
                native: true,
                onClick: () => {
                    navigate(pathAdmin.MANAGER_PRODUCT);
                },
            });
        });
    }, []);
    console.log(renderMessage);

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
        </>
    );
};

export default ExtendAdmin;
