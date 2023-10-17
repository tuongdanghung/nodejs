import React, { ChangeEvent, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Modal } from "../../../../interface/client";
import CheckBoxComponent from "../checkbox";
import "./index.scss";
import CheckBoxImage from "../checkBoxImage";
import { apiEditProduct, apiUpdateProductSize } from "../../../../apis";
const ModalEditProduct: React.FC<Modal> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [item, setItem] = useState<any>(props.item);
    const [itemInput, setItemInput] = useState<any>({});
    const [itemSelect, setItemSelect] = useState<any>({});
    const [itemCheckBox, setItemCheckBox] = useState<any>({});
    const [capacity, setCapacity] = useState<object[]>(props.capacity);
    const [brand, setBrand] = useState<object[]>(props.brand);
    const [color, setColor] = useState<object[]>(props.color);
    const [category, setCategory] = useState<object[]>(props.category);
    const [valueCapacity, setValueCapacity] = useState<object[]>([]);
    const [valueColor, setValueColor] = useState<object[]>([]);
    const [itemImage, setItemImage] = useState<any>([]);
    const [itemDescription, setDescription] = useState<any>("");
    const [valueImageFile, setValueImageFile] = useState<any>([]);
    const [valueImageCloud, setValueCloud] = useState<object>([]);
    const [filterProductSize, setFilterProductSize] = useState<object>([]);
    useEffect(() => {
        setOpen(props.open);
        setItem(props.item);
        setDescription(item.description);
        setFilterProductSize(props.filterProductSize);
        setItemInput({
            title: item.title,
            price: item.price,
            Stock: item.stock,
        });
        setItemSelect({
            category: item?.category?.id,
            brand: item?.brand?.id,
        });

        setItemCheckBox({
            color: item?.productSize?.color,
            capacity: item?.productSize?.capacity,
        });
        setItemImage(item.image);
        setBrand(props.brand);
        setCategory(props.category);
        setCapacity(props.capacity);
        setColor(props.color);
    }, [props]);
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = event.target;
        if (name === "category") {
            setItemSelect((prevData: any) => ({
                ...prevData,
                category: +value,
            }));
        }
        if (name === "brand") {
            setItemSelect((prevData: any) => ({ ...prevData, brand: +value }));
        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setItemInput((prevData: any) => ({ ...prevData, [name]: value }));
    };

    const handleClose = () => {
        props.handleClose(false);
    };
    const changeValueCapacity = (data: any) => {
        setValueCapacity(data);
    };
    const changeValueColor = (data: any) => {
        setValueColor(data);
    };
    const handleEdit = async () => {
        const payload = {
            ...itemInput,
            brandId: itemSelect.brand,
            categoryId: itemSelect.category,
            id: item.id,
            description: itemDescription,
        };

        if (Array.isArray(filterProductSize)) {
            const newDataProductSize = filterProductSize.map((item: any) =>
                typeof item === "object" ? item.id : item
            );
            const updateProductSize = {
                capacityId: valueCapacity,
                colorId: valueColor,
                productSizeId: newDataProductSize,
                productId: item.id,
            };
            const response = await apiUpdateProductSize(updateProductSize);
            console.log("<<<<<<", response);
        }
        const response = await apiEditProduct(payload, item.id);
        console.log(">>>>>", response);
    };
    const renderInputs = () => {
        return Object.keys(itemInput).map((key: any, index: any) => (
            <div key={index}>
                <label className="block">
                    {key.replace(/^\w/, (c: string) => c.toUpperCase())}
                </label>
                <input
                    className="border border-collapse rounded-lg w-full"
                    type="text"
                    name={key}
                    value={itemInput[key]} // Default to empty string
                    onChange={handleInputChange}
                />
            </div>
        ));
    };
    const renderSelect = () => {
        return Object.keys(itemSelect).map((key: any, index: any) => (
            <div key={index}>
                <label className="block">
                    {key.replace(/^\w/, (c: string) => c.toUpperCase())}
                </label>
                {key === "brand" ? (
                    <select
                        className="border border-collapse rounded-lg w-full"
                        value={itemSelect.brand}
                        name={key}
                        onChange={handleSelectChange}
                    >
                        {brand?.map((brandItem: any) => {
                            return (
                                <option key={brandItem.id} value={brandItem.id}>
                                    {brandItem.title}
                                </option>
                            );
                        })}
                    </select>
                ) : (
                    <select
                        className="border border-collapse rounded-lg w-full"
                        value={itemSelect.category}
                        name={key}
                        onChange={handleSelectChange}
                    >
                        {category?.map((categoryItem: any) => (
                            <option
                                key={categoryItem.id}
                                value={categoryItem.id}
                            >
                                {categoryItem.title}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        ));
    };
    const changeValueImage = (data: any) => {
        if (typeof data === "object" && data !== null) {
            if (Array.isArray(data)) {
                setValueCloud(data);
            } else {
                setValueImageFile(data.files);
                setValueCloud(data.image);
            }
        }
    };

    return (
        <div>
            <Dialog
                className="modal-dialog"
                open={open}
                handler={props.handleClose}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Product detail</DialogHeader>
                <DialogBody divider>
                    <div className="grid grid-cols-2 gap-5">
                        {renderInputs()}
                        {renderSelect()}
                    </div>
                    <div>
                        <CheckBoxComponent
                            item={item}
                            color={color}
                            capacity={capacity}
                            itemCheckBox={itemCheckBox}
                            changeValueCapacity={changeValueCapacity}
                            changeValueColor={changeValueColor}
                        />
                    </div>
                    <div className="mt-4 border border-separate rounded-lg p-4">
                        <label className="block">Description</label>
                        <textarea
                            className="border border-separate rounded-lg w-full h-[400px]"
                            value={itemDescription}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {/* <Required
                                    value={description}
                                    valid={checkValid.description}
                                    keywords=" Description"
                                    setShow={setCheckValid}
                                /> */}
                    </div>
                    <div>
                        <CheckBoxImage
                            image={itemImage}
                            changeValueImage={changeValueImage}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleClose}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={handleEdit}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default ModalEditProduct;
