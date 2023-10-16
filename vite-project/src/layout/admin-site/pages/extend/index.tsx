import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../../components";
import { AppDispatch } from "../../../../store";
import { GetOneUser } from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ExtendAdmin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const token = localStorage.getItem("auth");
    const user = useSelector((state: any) => state?.userReducer?.oneUser?.data);
    useEffect(() => {
        dispatch(GetOneUser(token));
    }, []);
    
    const checkRole = user?.roleId
    return (
        <>
            {checkRole === 1 ? (
                <div className="flex w-full">
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
