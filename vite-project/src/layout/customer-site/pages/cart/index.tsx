import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { GetOneUser, GetCartByUser } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { ToastContainer, toast } from "react-toastify";
import {
    apiDeleteCart,
    apiCreateOrderItem,
    apiCreateOrder,
    apiUpdateCart,
} from "../../../../apis";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import MapComponent from "../../components/map";
// import { io,Socket } from "socket.io-client";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const TABLE_HEAD = ["Title", "Image", "Quantity", "Total", ""];

const Cart: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState<any>(0);
    const [address, setAddress] = useState("");
    const token = localStorage.getItem("auth");
    const cart = useSelector((state: any) => state?.userReducer?.cart);
    const oneUser = useSelector(
        (state: any) => state?.userReducer?.oneUser?.data
    );
    const data = quantity !== 0 ? quantity : cart;
    useEffect(() => {
        dispatch(GetOneUser(token));
        dispatch(GetCartByUser(token));
    }, [quantity]);
    const handleQuantityChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
        productId: string
    ) => {
        const updatedProducts = cart.map((product: any) => {
            if (product.id === productId) {
                // Cập nhật giá trị quantity cho sản phẩm tương ứng
                return {
                    ...product,
                    quantity: +event.target.value,
                };
            }

            return product;
        });
        const req = updatedProducts.find((item: any) => item.id === productId);
        await apiUpdateCart({ quantity: req.quantity, id: req.id });
        setQuantity(updatedProducts);
    };
    const handleDelete = async (id: string) => {
        const response = await apiDeleteCart({ id });
        if (response.data.success) {
            toast.success("Delete item cart successfully");
            dispatch(GetCartByUser(token));
        } else {
            toast.error("Delete item cart failed");
        }
    };
    const handleAddressId = (address: any) => {
        setAddress(address);
    };
    const handleCheckout = async () => {
        const responseOrderItem = await apiCreateOrderItem();
        if (responseOrderItem.data.success) {
            const response = await apiCreateOrder({
                addressId: +address,
                paymentId: 1,
            });
            if (response.data.success) {
                Swal.fire("Congratulations!", response.data.message, "success");
                socket.emit("send_message", "Click!");
                dispatch(GetCartByUser(token));
            } else Swal.fire("Oops!", response.data.message, "error");
        }
    };

    const handleDecrease = async (productId: string) => {
        const updatedProducts = data?.map((product: any) => {
            if (product.id === productId) {
                // Cập nhật giá trị quantity cho sản phẩm tương ứng

                return {
                    ...product,
                    quantity: product.quantity - 1,
                };
            }
            return product;
        });
        const req = updatedProducts.find((item: any) => item.id === productId);
        await apiUpdateCart({ quantity: req.quantity, id: req.id });
        setQuantity(updatedProducts);
    };
    const handleIncrease = async (productId: string) => {
        const updatedProducts = data?.map((product: any) => {
            if (product.id === productId) {
                // Cập nhật giá trị quantity cho sản phẩm tương ứng

                return {
                    ...product,
                    quantity: product.quantity + 1,
                };
            }
            return product;
        });
        const req = updatedProducts.find((item: any) => item.id === productId);
        await apiUpdateCart({ quantity: req.quantity, id: req.id });
        setQuantity(updatedProducts);
    };
    let total = 0;
    data?.map((item: any) => {
        console.log(item.quantity);
        const price =
            item.productSize.capacity.percent * item.productSize.product.price;
        total += price * item.quantity;
    });
    return (
        <div>
            {data?.length > 0 ? (
                <div>
                    <Card className="w-full text-center">
                        <div className="flex">
                            <div className="flex-none border border-separate gap-4 w-[60%] p-5">
                                <h2 className="font-semibold text-xl py-4">
                                    Cart
                                </h2>
                                <table className="w-full table-auto text-center">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((item: any, index: any) => {
                                            // const formattedTotal =
                                            //     item.totalPrice.toLocaleString();
                                            const isLast =
                                                index === cart.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";
                                            return (
                                                <tr
                                                    key={index}
                                                    className="m-auto"
                                                >
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {
                                                                item
                                                                    ?.productSize
                                                                    ?.product
                                                                    ?.title
                                                            }
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            <img
                                                                className="m-auto"
                                                                width={80}
                                                                src={`${item?.productSize?.product?.image[0]?.src}`}
                                                                alt=""
                                                            />
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="flex justify-center">
                                                            <Button
                                                                onClick={() =>
                                                                    handleDecrease(
                                                                        item?.id
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </Button>
                                                            <input
                                                                className="w-[100px] rounded-md mx-3"
                                                                type="number"
                                                                value={
                                                                    item?.quantity
                                                                }
                                                                onChange={(e) =>
                                                                    handleQuantityChange(
                                                                        e,
                                                                        item?.id
                                                                    )
                                                                }
                                                            />
                                                            <Button
                                                                onClick={() =>
                                                                    handleIncrease(
                                                                        item?.id
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            as="a"
                                                            href="#"
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-medium"
                                                        >
                                                            {/* {formattedTotal} $ */}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            as="a"
                                                            href="#"
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-medium"
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="bg-[#ea4335] hover:bg-[#a03329] text-xs"
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Typography>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="grow border border-separate gap-4 p-5 ml-5">
                                <MapComponent
                                    user={oneUser}
                                    handleAddressId={handleAddressId}
                                />
                            </div>
                        </div>
                    </Card>
                    <div className="mt-6 flex flex-col items-end">
                        <p className="text-2xl font-bold">
                            Total: <span>{total.toLocaleString()} $</span>
                        </p>
                        <p className="text-2xl my-3 font-bold">
                            Shipping: <span>15 $</span>
                        </p>
                        {/* <Distance address={address} distance={distance} /> */}
                        <p className="text-2xl font-bold">
                            SubTotal:{" "}
                            <span>{(total + 15).toLocaleString()} $</span>
                        </p>
                        <Button
                            onClick={handleCheckout}
                            className="mt-4 border border-separate rounded-lg px-4 py-3 hover:text-white hover:bg-gray-900"
                        >
                            Checkout
                        </Button>
                    </div>
                    <ToastContainer />
                </div>
            ) : (
                <p className="text-center">
                    <img
                        width={"100%"}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbflu1tU5bBzFFu5-HqjhX-AbwnC3A31bmQ&usqp=CAU"
                        alt=""
                    />
                    <span>There are no products in the cart</span>
                </p>
            )}
        </div>
    );
};

export default Cart;
