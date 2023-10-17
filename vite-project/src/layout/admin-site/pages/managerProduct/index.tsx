import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
    Card,
    CardHeader,
    Button,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/pagination";
import Head from "../../components/layout/Head";
import {
    GetAllProduct,
    GetProductDetail,
    GetBrand,
    GetCategory,
    GetCapacity,
    GetColor,
    GetAllProductSize,
} from "../../../../store/actions";
import { apiDeleteProduct } from "../../../../apis";
import { AppDispatch } from "../../../../store";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ModalEditProduct from "../../components/modal/ModalEditProduct";
import Snipper from "../../components/snipper";

const TABLE_HEAD = ["Title", "Price", "Stock", "Category", "Brand", ""];
const ManagerProduct = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [filterProductSize, setFilterProductSize] = useState<any>([]);
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<any>([]);
    const product = useSelector(
        (state: any) => state?.productReducer?.products
    );
    const item = useSelector((state: any) => state?.productReducer.detail);
    const brand = useSelector((state: any) => state?.productReducer.brand);
    const ram = useSelector((state: any) => state?.productReducer.ram);
    const color = useSelector((state: any) => state?.productReducer.color);
    const productSize = useSelector(
        (state: any) => state?.productReducer.productSize
    );

    const [isSnipper, setIsSnipper] = useState(false);
    const capacity = useSelector(
        (state: any) => state?.productReducer.capacity
    );
    const category = useSelector(
        (state: any) => state?.productReducer.category
    );

    const token = localStorage.getItem("auth");

    useEffect(() => {
        dispatch(GetAllProduct(null));
        dispatch(GetCapacity(null));
        dispatch(GetColor(null));
        dispatch(GetAllProductSize(null));
    }, [item]);

    const handleDelete = async (id: string) => {
        const payload = { id: id, token: token };
        const response = await apiDeleteProduct(payload);
        if (response.data.success) {
            dispatch(GetAllProduct(null));
            toast.success("Delete product successfully");
        } else {
            toast.error("Delete product failed");
        }
    };

    const handleOpen = (id: string) => {
        const detail = { id: id, token: token };
        setFilterProductSize(
            productSize?.filter(function (item: any) {
                return item.productId === id;
            })
        );
        dispatch(GetProductDetail(detail));
        dispatch(GetBrand(null));
        dispatch(GetCategory(null));
        setOpen(!open);
    };
    const handleClose = (close: boolean) => {
        setOpen(close);
    };

    const handlePage = (pagination: any) => {
        setData(pagination);
    };
    return (
        <Card className="h-full w-full">
            {isSnipper ? <Snipper /> : null}
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Head title={"Manager Product"} slug={"manager-product"} />
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
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item: any, index: any) => {
                            const isLast = index === product.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={item.id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3 justify-center">
                                            {item.title}
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        {item.price.toLocaleString("en-US")} $
                                    </td>
                                    <td className={classes}>
                                        {item.stock.toLocaleString("en-US")}
                                    </td>
                                    <td className={classes}>
                                        {item.category.title}
                                    </td>
                                    <td className={classes}>
                                        {item.brand.title}
                                    </td>
                                    <td className={`${classes}`}>
                                        <Button
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            className="bg-red-500  hover:bg-red-700 text-white font-bold px-6 py-3 rounded text-lg mr-2"
                                        >
                                            <AiFillDelete className="h-5 w-6 text-lg text-white" />
                                        </Button>
                                        <Button
                                            onClick={() => handleOpen(item.id)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 py-3 rounded text-lg"
                                        >
                                            <AiFillEdit className="h-5 w-6 text-white" />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center border-t border-blue-gray-50 p-4 justify-center">
                <Pagination data={product} handlePage={handlePage} />
            </CardFooter>
            <ModalEditProduct
                open={open}
                item={item}
                brand={brand}
                filterProductSize={filterProductSize}
                ram={ram}
                color={color}
                capacity={capacity}
                category={category}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
            <ToastContainer />
        </Card>
    );
};

export default ManagerProduct;
