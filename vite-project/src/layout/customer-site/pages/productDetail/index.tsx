import { useEffect, useState } from "react";
import {
    GetProductDetail,
    GetOneUser,
    // GetOneOrder,
    GetAllProductSize,
    GetCartByUser,
} from "../../../../store/actions";
import { Button, Rating, Textarea } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { apiCreateCart, apiCreateComment } from "../../../../apis";
import { ToastContainer, toast } from "react-toastify";
const ProductDetail = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState(1);
    const detail = useSelector((state: any) => state?.productReducer.detail);
    const oneUser = useSelector((state: any) => state?.userReducer.oneUser);
    const order = useSelector((state: any) => state?.orderReducer);
    const productSize = useSelector(
        (state: any) => state?.productReducer.productSize
    );
    const [capacity, setCapacity] = useState<any>([]);
    const [color, setColor] = useState<any>([]);
    const token = localStorage.getItem("auth");
    const [activeCapacity, setActiveCapacity] = useState(0);
    const [activeColor, setActiveColor] = useState(0);
    // const [checkComment, setCheckComment] = useState(false);
    // const [valueComment, setValueComment] = useState("");
    const [isId, setIsId] = useState<string | null>(null);

    const handleButtonCapacity = (index: any) => {
        setActiveCapacity(index);
        setCapacity(detail?.productSize?.capacity[index]);
    };
    const handleButtonColor = (index: any) => {
        setActiveColor(index);
        // setColor(detail?.color[index]);
    };
    // const dataColor =
    //     color && !Array.isArray(color)
    //         ? color
    //         : detail.color !== undefined && detail?.color[0];
    useEffect(() => {
        // setCapacity(detail?.capacity);
        // setColor(detail?.color);
        dispatch(GetProductDetail({ id: params.id, token }));
        dispatch(GetOneUser(token));
        // dispatch(GetOneOrder(token));
        // dispatch(GetOneOrder(token));
        dispatch(GetAllProductSize(null));
    }, []);
    useEffect(() => {
        setCapacity(
            detail?.productSize?.capacity &&
                !Array.isArray(detail?.productSize?.capacity)
                ? detail?.productSize?.capacity
                : detail?.productSize?.capacity !== undefined &&
                      detail?.productSize?.capacity[0]
        );
        setColor(
            detail?.productSize?.color &&
                !Array.isArray(detail?.productSize?.color)
                ? detail?.productSize?.color
                : detail?.productSize?.color !== undefined &&
                      detail?.productSize?.color[0]
        );
    }, [detail]);

    // useEffect(() => {
    //     const checkOrder = order?.orderByUser?.find(
    //         (item: any) => item.orderBy === oneUser?.id
    //     );
    //     // check mua hay chua
    //     if (checkOrder) {
    //         // check xem da mua sp nao
    //         const isIdExists = order?.orderByUser?.some((order: any) =>
    //             order.product.some(
    //                 (product: any) => product.product === detail.id
    //             )
    //         );
    //         if (isIdExists) {
    //             // check comment hay chua
    //             const checkComment = detail?.rating?.find(
    //                 (item: any) => item.user === oneUser?.id
    //             );
    //             if (!checkComment) {
    //                 setCheckComment(true);
    //             }
    //         }
    //     }
    // }, [oneUser, order, detail]);

    const handleAddToCart = async (id: any) => {
        const productSizeId = productSize?.filter(
            (item: any) =>
                item.capacityId === capacity.id &&
                item.colorId === color.id &&
                item.productId === id
        );
        const response = await apiCreateCart({
            productSizeId: productSizeId[0].id,
            quantity,
        });
        if (response.data.success) {
            toast.success("Add to cart successfully");
            dispatch(GetCartByUser(token));
        } else {
            toast.error("Add to cart failed");
        }
    };
    // const handleEdit = (id: string) => {
    //     setIsId(id);
    //     setCheckComment(true);
    //     const detailComment = detail?.rating?.find(
    //         (item: any) => item.id === id
    //     );
    //     if (detailComment) {
    //         setValueComment(detailComment.comment);
    //     }
    // };

    // const handleRatingChange = async (newValue: any, index: any) => {
    //     const check = detail?.rating?.find(
    //         (item: any) => item.user === oneUser?.id
    //     );
    //     if (check) {
    //         const updatedItems = [...detail?.rating];
    //         updatedItems[newValue] = { star: index };
    //         const response = await apiCreateComment({
    //             ...updatedItems[newValue],
    //             token,
    //             userId: oneUser?.id,
    //             product: detail?.id,
    //         });
    //         if (response.status === 200) {
    //             toast.success("Update star successfully");
    //         } else {
    //             toast.error("Update star failed");
    //         }
    //     }
    // };
    // const handleComment = async () => {
    //     if (isId !== null) {
    //         const response = await apiCreateComment({
    //             comment: valueComment,
    //             token,
    //             userId: oneUser?.id,
    //             product: detail?.id,
    //         });
    //         if (response.status === 200) {
    //             setCheckComment(true);
    //             setValueComment("");
    //             setIsId(null);
    //             dispatch(GetProductDetail({ id: params.id, token }));
    //             toast.success("Update comment successfully");
    //         } else {
    //             toast.error("Update comment failed");
    //         }
    //     } else {
    //         const response = await apiCreateComment({
    //             comment: valueComment,
    //             token,
    //             star,
    //             userId: oneUser?.id,
    //             product: detail?.id,
    //         });
    //         if (response.status === 200) {
    //             setCheckComment(false);
    //             setValueComment("");
    //             setIsId(null);
    //             dispatch(GetProductDetail({ id: params.id, token }));
    //             toast.success("Create comment successfully");
    //         } else {
    //             toast.error("Create comment failed");
    //         }
    //     }
    // };
    const formattedNumber = (
        detail?.price * capacity?.percent
    ).toLocaleString();

    return (
        <div>
            <div className="p-4 border border-collapse rounded m-0">
                <div className="grid grid-cols-3 gap-5">
                    <div className="col">
                        <img
                            style={{ width: "100%", maxHeight: "72%" }}
                            src={
                                detail?.image !== undefined &&
                                detail?.image[0]?.src
                            }
                            alt=""
                        />
                        <ul className="grid grid-cols-3 gap-5 mt-3">
                            {detail?.image?.map((item: any, index: any) => {
                                return (
                                    <li key={index}>
                                        <img src={item.src} alt="" />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="col">
                        <h1 className="text-4xl font-bold mb-4">
                            Title: {detail.title}
                        </h1>
                        <h1 className="text-xl font-bold mb-4">
                            <p>
                                Price: <span>{formattedNumber} $ </span>
                            </p>
                        </h1>
                        <p>Technology: {detail?.brand?.title}</p>
                        <div className="mt-4 flex">
                            <span className="w-[100px] block">Capacity</span>
                            {detail?.productSize?.capacity?.map(
                                (item: any, index: any) => {
                                    return (
                                        <button
                                            key={index}
                                            className={`border border-collapse py-1 px-3 ml-2 rounded ${
                                                activeCapacity === index
                                                    ? "bg-gray-900 text-white"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleButtonCapacity(index)
                                            }
                                        >
                                            {item.size} GB
                                        </button>
                                    );
                                }
                            )}
                        </div>
                        <div className="mt-2 flex">
                            <span className="w-[100px] block">Color</span>
                            {detail?.productSize?.color?.map(
                                (item: any, index: number) => {
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() =>
                                                handleButtonColor(index)
                                            }
                                            className={`border border-collapse py-1 px-3 ml-2 rounded ${
                                                activeColor === index
                                                    ? "bg-gray-900 text-white"
                                                    : ""
                                            }`}
                                        >
                                            {item.color}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                        <div className="mt-2 flex">
                            <span className="w-[100px] block">Quantity</span>
                            <p className="ml-2">{detail.stock} pcs</p>
                        </div>
                        {detail.stock > 0 ? (
                            <div className="mt-2 flex">
                                <span className="w-[100px] block">Enter</span>
                                <button
                                    onClick={() => setQuantity(quantity - 1)}
                                    className="border h-[30px] border-collapse py-1 px-3 ml-2"
                                >
                                    -
                                </button>
                                <input
                                    className="w-[150px] h-[30px] ml-2"
                                    type="number"
                                    value={quantity ? quantity : 1}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                />
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="border h-[30px] border-collapse py-1 px-3 ml-2"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <p className="text-red-500">out of stock</p>
                        )}
                        {token !== null ? (
                            <div>
                                {oneUser?.isBlocked === true ? (
                                    <i className="text-red-500">
                                        Your account is so bad that you can't
                                        buy the product
                                    </i>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleAddToCart(detail.id)
                                        }
                                        className=" bg-red-500 hover:bg-red-600 text-white border border-collapse mt-6 px-3 py-2 w-full"
                                    >
                                        Add to cart
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p className="mt-4">
                                Please log in{" "}
                                <Link
                                    className="text-red-500 hover:text-light-blue-900"
                                    to={"/login"}
                                >
                                    here
                                </Link>{" "}
                                to purchase
                            </p>
                        )}
                    </div>
                    {/* <div className="col">3</div> */}
                </div>
                <div className="mt-6">
                    <h1 className="text-3xl font-bold mb-4">Description</h1>
                    <p>{detail.description}</p>
                </div>
            </div>
            {/* <div className="p-4 border border-collapse rounded-md mt-6">
                {checkComment === true ? (
                    <div className="row">
                        <Rating
                            value={star}
                            onChange={(newValue) => setStar(newValue)}
                        />
                        <div className="col">
                            <Textarea
                                label="Message"
                                value={valueComment}
                                onChange={(e) =>
                                    setValueComment(e.target.value)
                                }
                            />
                        </div>
                        <div className="col mt-3">
                            <Button onClick={handleComment}>Comment</Button>
                        </div>
                    </div>
                ) : null}
                <div className="comment mt-8">
                    <h1>Comment</h1>
                    <div className="mt-5">
                        {detail?.rating?.length > 0 &&
                            detail?.rating?.map((item: any, index: number) => {
                                return (
                                    <div key={item.id}>
                                        <div className="my-3">
                                            <p className="flex">
                                                <span className="mr-3">
                                                    {item.user ===
                                                    oneUser?.id ? (
                                                        <span>
                                                            {oneUser.firstName}{" "}
                                                            {oneUser.lastName} :
                                                        </span>
                                                    ) : null}
                                                </span>
                                                <Rating
                                                    value={item.star}
                                                    readonly={
                                                        item.user ===
                                                        oneUser?.id
                                                            ? false
                                                            : true
                                                    }
                                                    onChange={(newValue) =>
                                                        handleRatingChange(
                                                            index,
                                                            newValue
                                                        )
                                                    }
                                                />
                                            </p>
                                            <p className="mt-2 text-sm">
                                                {item.comment}
                                            </p>
                                            {item.user === oneUser?.id ? (
                                                <div className="mt-4">
                                                    <Button
                                                        onClick={() =>
                                                            handleEdit(item.id)
                                                        }
                                                    >
                                                        edit
                                                    </Button>
                                                    <Button className="ml-3">
                                                        delete
                                                    </Button>
                                                </div>
                                            ) : null}
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div> */}
            <ToastContainer />
        </div>
    );
};

export default ProductDetail;
