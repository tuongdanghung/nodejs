import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import Pagination from "../../components/pagination";
import Head from "../../components/layout/Head";
import { GetCategory } from "../../../../store/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { apiDeleteCategory } from "../../../../apis";
import DialogComponent from "../../components/modal/modalUpdate";
import { ToastContainer, toast } from "react-toastify";
const TABLE_HEAD = ["Title", ""];

const ManagerCategory: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<any>([]);
    const token = localStorage.getItem("auth");
    const category = useSelector(
        (state: any) => state?.productReducer.category
    );
    const [id, setId] = useState<string>("");
    useEffect(() => {
        dispatch(GetCategory(null));
    }, []);
    const handleDelete = async (id: string) => {
        const payload = { id, token: token };
        const response = await apiDeleteCategory(payload);
        if (response.data.success) {
            dispatch(GetCategory(null));
            toast.success("Delete category successfully");
        } else {
            toast.error("Delete category failed");
        }
    };
    const handleOpen = (id: string) => {
        setOpen(!open);
        setId(id);
    };
    const handleClose = (close: boolean) => {
        setOpen(close);
    };

    const handlePage = (pagination: any) => {
        setData(pagination);
    };
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Head title={"Manager Category"} slug={"manager-category"} />
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
                            const isLast = index === item.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={item.id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3 justify-center">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {item.title}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={`${classes}`}>
                                        <div className=" flex justify-end">
                                            <Button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                className="bg-red-500  hover:bg-red-700 text-white font-bold px-6 py-3 rounded text-lg mr-2"
                                            >
                                                <AiFillDelete className="h-5 w-6 text-lg text-white" />
                                            </Button>

                                            <Button
                                                onClick={() => {
                                                    handleOpen(item.id);
                                                }}
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-3 rounded text-lg"
                                            >
                                                <AiFillEdit className="h-5 w-6 text-white" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center border-t border-blue-gray-50 p-4 justify-center">
                <Pagination data={category} handlePage={handlePage} />
            </CardFooter>
            <DialogComponent
                id={id}
                open={open}
                slug={"manager-category"}
                title={"Edit Category"}
                handleClose={handleClose}
            />
            <ToastContainer />
        </Card>
    );
};

export default ManagerCategory;
