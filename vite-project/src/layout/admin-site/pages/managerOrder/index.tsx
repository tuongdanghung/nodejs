import React, { ChangeEvent, useEffect, useState } from "react";
import { GetAllOrder } from "../../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    CardFooter,
    Button,
} from "@material-tailwind/react";
import Pagination from "../../components/pagination";
import Head from "../../components/layout/Head";
import { AiFillEdit } from "react-icons/ai";
import { apiUpdateOrder } from "../../../../apis";
import { ToastContainer, toast } from "react-toastify";
import ModalOrderComponent from "../../components/modal/orderDetail";

const TABLE_HEAD = [
    "Code Orders",
    "Address",
    "Total",
    "Shipping",
    "Sub Total",
    "Status",
    "",
];

const ManagerOrder: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = useState<boolean>(false);
    const orders = useSelector((state: any) => state?.orderReducer?.orders);
    const [newData, setNewData] = useState<any>([]);
    const token = localStorage.getItem("auth");
    const data = newData?.length > 0 ? newData : orders !== undefined && orders;
    const [detail, setDetail] = useState(null);
    const handleClose = (close: boolean) => {
        setOpen(close);
    };
    useEffect(() => {
        dispatch(GetAllOrder(token));
    }, []);
    const handleChange = async (
        event: ChangeEvent<HTMLSelectElement>,
        orderId: string
    ) => {
        const value = event.target.value;
        const updatedData = orders?.map((order: any) => {
            if (order.id === orderId) {
                return { ...order, status: value };
            }
            return order;
        });

        setNewData(updatedData);
        const response = await apiUpdateOrder({
            id: orderId,
            status: value,
            token,
        });
        if ((response as any).data.success) {
            dispatch(GetAllOrder(token));
            toast.success("Updated status successfully");
        } else {
            toast.error("Updated status failed");
        }
    };

    const handleOpen = (product: any) => {
        setOpen(!open);
        setDetail(product);
    };

    const handlePage = (pagination: any) => {
        setNewData(pagination);
    };
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Head title={"Manager Order"} slug="manager-order" />
            </CardHeader>
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-center">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                            const isLast = index === orders.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={item.id}>
                                    <td className={classes}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                MDH {item.orderItemId}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {item.address.province}
                                                {" - "}
                                                {item.address.district}
                                                {" - "}
                                                {item.address.ward}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {item.total} $
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {item.shipping} $
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {item.shipping + item.total} $
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                <select
                                                    className="border border-collapse rounded-lg w-full"
                                                    value={item.status}
                                                    onChange={(e) =>
                                                        handleChange(e, item.id)
                                                    }
                                                >
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="processing">
                                                        Processing
                                                    </option>
                                                    <option value="shipping">
                                                        Shipping
                                                    </option>
                                                    <option value="done">
                                                        Done
                                                    </option>
                                                    <option value="cancel">
                                                        Cancel
                                                    </option>
                                                </select>
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center justify-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                <Button
                                                    onClick={() => {
                                                        handleOpen(item.sp);
                                                    }}
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-3 rounded text-lg"
                                                >
                                                    <AiFillEdit className="h-5 w-6 text-white" />
                                                </Button>
                                            </Typography>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center border-t border-blue-gray-50 p-4 justify-center">
                <Pagination data={orders} handlePage={handlePage} />
            </CardFooter>
            <ToastContainer />

            <ModalOrderComponent
                title={"History order"}
                handleClose={handleClose}
                open={open}
                detail={detail}
            />
        </Card>
    );
};

export default ManagerOrder;
