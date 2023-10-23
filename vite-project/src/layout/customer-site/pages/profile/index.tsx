import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetOneUser } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
    apiUpdateUser,
    apiAddNewAddress,
    apiUpdateAddress,
    apiDeleteAddress,
} from "../../../../apis";
import { ToastContainer, toast } from "react-toastify";
const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const oneUser = useSelector(
        (state: any) => state?.userReducer?.oneUser?.data
    );
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        active: "",
    });
    const [addressData, setAddressData] = useState({
        province: "",
        district: "",
        ward: "",
        phone: "",
    });
    const token = localStorage.getItem("auth");
    const [isCheck, setIsCheck] = useState(true);
    const [isIdAddress, setIsIdAddress] = useState(null);
    const [avatar, setAvatar] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(GetOneUser(token));
        token === null && navigate("/login");
    }, []);

    useEffect(() => {
        setUserData({
            firstName: oneUser?.firstName,
            lastName: oneUser?.lastName,
            mobile: oneUser?.mobile,
            email: oneUser?.email,
            active: oneUser?.active,
        });
    }, [oneUser]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const newData = {
            ...userData,
            avatar,
        };
        const formData = new FormData();
        for (let i of Object.entries(newData)) formData.append(i[0], i[1]);
        for (let img of avatar) formData.append("avatar", img);
        const response = await apiUpdateUser(formData);
        if (response.status === 200) {
            toast.success("User updated successfully");
            dispatch(GetOneUser(token));
            setIsCheck(true);
        } else {
            toast.success("User updated failed");
        }
    };

    const handleFindAddress = (id: any) => {
        setIsIdAddress(id);
        const addressDetail = oneUser?.address?.find(
            (item: any) => item.id === id
        );
        setAddressData({
            province: addressDetail.province,
            district: addressDetail.district,
            ward: addressDetail.ward,
            phone: addressDetail.phone,
        });
    };

    const handleUpdateAddress = async () => {
        const response = await apiUpdateAddress({ isIdAddress, addressData });
        if (response.data.success) {
            toast.success("Create Address successfully");
            setAddressData({
                province: "",
                district: "",
                ward: "",
                phone: "",
            });
            setIsIdAddress(null);
            dispatch(GetOneUser(token));
            setIsCheck(true);
        } else {
            toast.success("Create Address failed");
        }
    };

    const handleInputChangeAddress = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setAddressData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleCreateAddress = async () => {
        const response = await apiAddNewAddress(addressData);
        if (response.data.success) {
            toast.success("Create Address successfully");
            setAddressData({
                province: "",
                district: "",
                ward: "",
                phone: "",
            });
            dispatch(GetOneUser(token));
            setIsCheck(true);
        } else {
            toast.success("Create Address failed");
        }
    };

    const handleDeleteAddress = async (id: any) => {
        const response = await apiDeleteAddress(id);
        if (response.data.success) {
            toast.success("Delete Address successfully");
            dispatch(GetOneUser(token));
            setIsCheck(true);
        } else {
            toast.success("Create Address failed");
        }
    };
    return (
        <div>
            <div className="p-4 border border-collapse rounded-md m-0">
                <ToastContainer />
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div>
                        <div className="px-4 py-2">
                            <img
                                width={150}
                                src={`${oneUser?.avatar}`}
                                alt=""
                            />
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="w-full mx-2">
                        <div>
                            <div className="bg-white p-3 shadow-sm border border-collapse rounded-md">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span className="tracking-wide">
                                        Profile
                                    </span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">
                                                First Name
                                            </div>
                                            <div className="px-4 py-2">
                                                {oneUser?.firstName}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">
                                                Last Name
                                            </div>
                                            <div className="px-4 py-2">
                                                {oneUser?.lastName}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">
                                                Email
                                            </div>
                                            <div className="px-4 py-2">
                                                {oneUser?.email}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">
                                                Active
                                            </div>
                                            <div className="px-4 py-2">
                                                {oneUser?.active}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={() => setIsCheck(!isCheck)}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                        {isCheck !== true ? (
                            <div className=" border border-collapse rounded-md mt-6 p-5">
                                <div className="grid grid-cols-4 gap-5">
                                    <div>
                                        <label>First Name</label>
                                        <Input
                                            type="text"
                                            value={userData?.firstName}
                                            name="firstName"
                                            className="w-full"
                                            crossOrigin={undefined}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <Input
                                            type="text"
                                            value={userData?.lastName}
                                            name="lastName"
                                            className="w-full"
                                            crossOrigin={undefined}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Active</label>
                                        <Input
                                            type="text"
                                            disabled
                                            value={userData?.active}
                                            name="mobile"
                                            className="w-full"
                                            crossOrigin={undefined}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Email</label>
                                        <Input
                                            type="text"
                                            disabled
                                            name="email"
                                            value={userData?.email}
                                            className="w-full"
                                            crossOrigin={undefined}
                                        />
                                    </div>
                                    <div>
                                        <label>Avatar</label>
                                        <input
                                            className="rounded-lg mt-4 border border-separate"
                                            onChange={(event: any) =>
                                                setAvatar(event.target.files)
                                            }
                                            type="file"
                                            multiple
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleUpdate} className="mt-4">
                                    Update
                                </Button>
                            </div>
                        ) : null}
                        <div className="mt-2">
                            <div className="bg-white p-3 shadow-sm border border-collapse rounded-md">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span className="tracking-wide">
                                        Address
                                    </span>
                                </div>
                                <div className="text-gray-700">
                                    {oneUser?.address.map(
                                        (item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className=" flex items-center p-2 text-sm border border-separate my-3 rounded-md"
                                                >
                                                    <div className="w-[80%]">
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">
                                                                Province
                                                            </div>
                                                            <div className="px-4 py-2">
                                                                {item.province}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">
                                                                District
                                                            </div>
                                                            <div className="px-4 py-2">
                                                                {item.district}
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">
                                                                Ward
                                                            </div>
                                                            <div className="px-4 py-2">
                                                                {item.ward}
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">
                                                                Phone
                                                            </div>
                                                            <div className="px-4 py-2">
                                                                {item.phone}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        className="w-[10%] h-[50px] mr-2"
                                                        onClick={() =>
                                                            handleFindAddress(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="w-[10%] px-4 h-[50px]"
                                                        onClick={() =>
                                                            handleDeleteAddress(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className=" border border-collapse rounded-md mt-6 p-5">
                            <div className="grid grid-cols-4 gap-5">
                                <div>
                                    <label>Province</label>
                                    <Input
                                        type="text"
                                        value={addressData?.province}
                                        name="province"
                                        className="w-full"
                                        crossOrigin={undefined}
                                        onChange={handleInputChangeAddress}
                                    />
                                </div>
                                <div>
                                    <label>District</label>
                                    <Input
                                        type="text"
                                        value={addressData?.district}
                                        name="district"
                                        className="w-full"
                                        crossOrigin={undefined}
                                        onChange={handleInputChangeAddress}
                                    />
                                </div>
                                <div>
                                    <label>Ward</label>
                                    <Input
                                        type="text"
                                        value={addressData?.ward}
                                        name="ward"
                                        className="w-full"
                                        crossOrigin={undefined}
                                        onChange={handleInputChangeAddress}
                                    />
                                </div>
                                <div>
                                    <label>Phone</label>
                                    <Input
                                        type="number"
                                        onChange={handleInputChangeAddress}
                                        name="phone"
                                        value={addressData?.phone}
                                        className="w-full"
                                        crossOrigin={undefined}
                                    />
                                </div>
                            </div>
                            {isIdAddress !== null ? (
                                <Button
                                    onClick={handleUpdateAddress}
                                    className="mt-4"
                                >
                                    Update
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleCreateAddress}
                                    className="mt-4"
                                >
                                    Create
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
