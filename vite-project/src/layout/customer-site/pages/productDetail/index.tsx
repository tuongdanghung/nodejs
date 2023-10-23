import { useEffect, useState } from "react";
import {
    GetProductDetail,
    GetOneUser,
    // GetOneOrder,
    GetAllProductSize,
    GetCartByUser,
} from "../../../../store/actions";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { apiCreateCart } from "../../../../apis";
import { ToastContainer, toast } from "react-toastify";
const ProductDetail = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState(1);
    const detail = useSelector((state: any) => state?.productReducer.detail);
    const oneUser = useSelector((state: any) => state?.userReducer.oneUser);
    const productSize = useSelector(
        (state: any) => state?.productReducer.productSize
    );
    const [capacity, setCapacity] = useState<any>([]);
    const [color, setColor] = useState<any>([]);
    const token = localStorage.getItem("auth");
    const [activeCapacity, setActiveCapacity] = useState(0);
    const [activeColor, setActiveColor] = useState(0);

    const handleButtonCapacity = (index: any) => {
        setActiveCapacity(index);
        setCapacity(detail?.productSize?.capacity[index]);
    };
    const handleButtonColor = (index: any) => {
        setActiveColor(index);
    };
    useEffect(() => {
        dispatch(GetProductDetail({ id: params.id, token }));
        dispatch(GetOneUser(token));
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
    const handleAddToCart = async (id: any) => {
        const productSizeId = productSize?.filter(
            (item: any) =>
                item.capacityId === capacity.id &&
                item.colorId === color.id &&
                item.productId === id
        );
        console.log(productSizeId);
        const response = await apiCreateCart({
            productSizeId: productSizeId[0].id,
            quantity,
        });
        if (response.data.success) {
            toast.success("Add to cart successfully");
            dispatch(GetCartByUser(token));
        } else {
            toast.warning("Products already in the cart");
        }
    };
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
                                    onClick={() =>
                                        setQuantity(
                                            quantity > 0 ? quantity - 1 : 1
                                        )
                                    }
                                    className="border h-[30px] border-collapse py-1 px-3 ml-2"
                                >
                                    -
                                </button>
                                <input
                                    className="w-[150px] h-[30px] ml-2"
                                    type="number"
                                    value={quantity ? quantity : 1}
                                    onChange={(e) =>
                                        setQuantity(
                                            Number(
                                                e.target.value > detail.stock
                                                    ? detail.stock
                                                    : e.target.value
                                            )
                                        )
                                    }
                                />
                                <button
                                    onClick={() =>
                                        setQuantity(
                                            quantity < detail.stock
                                                ? quantity + 1
                                                : detail.stock
                                        )
                                    }
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
                                {oneUser?.data?.active === "false" ? (
                                    <i className="text-red-500">
                                        Your account is so bad that you can't
                                        buy the product
                                    </i>
                                ) : (
                                    <div>
                                        {detail.stock > 0 ? (
                                            <button
                                                onClick={() =>
                                                    handleAddToCart(detail.id)
                                                }
                                                className=" bg-red-500 hover:bg-red-600 text-white border border-collapse mt-6 px-3 py-2 w-full"
                                            >
                                                Add to cart
                                            </button>
                                        ) : null}
                                    </div>
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
            <ToastContainer />
        </div>
    );
};

export default ProductDetail;
