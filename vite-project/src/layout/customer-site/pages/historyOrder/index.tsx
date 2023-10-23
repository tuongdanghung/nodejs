import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { GetAllOrderByUser } from "../../../../store/actions";
import { Button, Card, Typography } from "@material-tailwind/react";
import { AiFillEdit } from "react-icons/ai";
import ModalOrderComponent from "../../components/modal";
import { apiUpdateOrder } from "../../../../apis";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HistoryOrder = () => {
    const token = localStorage.getItem("auth");
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const order = useSelector((state: any) => state?.orderReducer.orderByUser);
    const [newData, setNewData] = useState<any>([]);
    const data = newData.length > 0 ? newData : order !== undefined && order;
    const [detail, setDetail] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(GetAllOrderByUser(token));
        token === null && navigate("/login");
    }, []);
    const TABLE_HEAD = ["MDH", "Address", "Phone", "Status", ""];
    const handleOpen = (id: string) => {
        setOpen(!open);
        const history = order?.find((item: any) => item.id === id);
        if (history) {
            setDetail(history);
        }
    };
    const handleClose = (close: boolean) => {
        setOpen(close);
    };
    const handleChange = async (
        event: ChangeEvent<HTMLSelectElement>,
        orderId: string
    ) => {
        const value = event.target.value;
        const response = await apiUpdateOrder({
            id: orderId,
            status: value,
        });
        if ((response as any).data.success) {
            dispatch(GetAllOrderByUser(token));
            toast.success("Updated status successfully");
        } else {
            toast.error("Updated status failed");
        }
    };
    return (
        <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
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
                        const isLast = index === order.length - 1;
                        const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={item.id}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        MDH{item.orderItemId}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {item.address.province}
                                        {" - "}
                                        {item.address.district}
                                        {" - "}
                                        {item.address.ward}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        0{item.address.phone}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {item.status === "pending" ? (
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
                                                <option value="Cancel">
                                                    Cancel
                                                </option>
                                            </select>
                                        ) : (
                                            <p className="border border-gray-800 p-3 rounded-lg">
                                                {item.status}
                                            </p>
                                        )}
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
                                            onClick={() => {
                                                handleOpen(item.id);
                                            }}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-3 rounded text-lg"
                                        >
                                            <AiFillEdit className="h-5 w-6 text-white" />
                                        </Button>
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ModalOrderComponent
                title={"History order"}
                handleClose={handleClose}
                open={open}
                detail={detail}
            />
            <ToastContainer />
        </Card>
    );
};

export default HistoryOrder;
