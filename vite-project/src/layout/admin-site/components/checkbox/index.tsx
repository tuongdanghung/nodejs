import { useEffect, useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import "./index.scss";

const CheckBoxComponent = (props: any) => {
    const [capacity, setCapacity] = useState(props.capacity);
    const [color, setColor] = useState(props.color);
    const [itemCheckBox, setItemCheckBox] = useState(props.itemCheckBox);
    const [itemValueColor, setItemValueColor] = useState(
        props.itemCheckBox.color
    );
    const [itemValueCapacity, setItemValueCapacity] = useState(
        props.itemCheckBox.capacity
    );
    useEffect(() => {
        setItemCheckBox(props.itemCheckBox);
        setItemValueCapacity(props.itemCheckBox.capacity);
        setItemValueColor(props.itemCheckBox.color);
        setColor(props.color);
        setCapacity(props.capacity);

        const newDataCapacity = props.itemCheckBox.capacity?.map((item: any) =>
            typeof item === "object" ? item.id : item
        );
        const newDataColor = props.itemCheckBox.color?.map((item: any) =>
            typeof item === "object" ? item.id : item
        );
        props.changeValueCapacity(newDataCapacity);
        props.changeValueColor(newDataColor);
    }, [props.itemCheckBox, props.ram, props.capacity]);
    const handleCheckboxCapacityChange = (size: any) => {
        const updatedCheckBoxSizes = [...itemValueCapacity];
        const sizeIndex = updatedCheckBoxSizes.findIndex((selectItem) => {
            return selectItem.id === size.id;
        });
        if (sizeIndex !== -1) {
            updatedCheckBoxSizes.splice(sizeIndex, 1);
        } else {
            updatedCheckBoxSizes.push(size);
        }
        const newData = updatedCheckBoxSizes.map((item: any) =>
            typeof item === "object" ? item.id : item
        );
        props.changeValueCapacity(newData);
        setItemValueCapacity(updatedCheckBoxSizes);
    };
    const handleCheckboxColorChange = (color: any) => {
        const updatedCheckBoxColor = [...itemValueColor];
        const colorIndex = updatedCheckBoxColor.findIndex((selectItem) => {
            return selectItem.id === color.id;
        });
        if (colorIndex !== -1) {
            updatedCheckBoxColor.splice(colorIndex, 1);
        } else {
            updatedCheckBoxColor.push(color);
        }
        const newData = updatedCheckBoxColor.map((item: any) =>
            typeof item === "object" ? item.id : item
        );
        props.changeValueColor(newData);
        setItemValueColor(updatedCheckBoxColor);
    };
    return Object.keys(itemCheckBox).map((key: any, index: any) => (
        <div className="mt-4 border border-separate rounded-lg p-4" key={index}>
            <label>{key.replace(/^\w/, (c: string) => c.toUpperCase())}</label>
            {key === "capacity" && (
                <div className="grid grid-cols-3 gap-5">
                    {capacity?.map((size: any, index: any) => {
                        const isSizeInSelect = itemValueCapacity?.some(
                            (selectItem: any) => selectItem.id === size.id
                        );
                        return (
                            <div
                                key={index}
                                className="flex items-center checked-button"
                            >
                                <label className="label-css">
                                    {size.size}GB
                                </label>
                                <Checkbox
                                    value={size}
                                    onChange={() =>
                                        handleCheckboxCapacityChange(size)
                                    }
                                    checked={isSizeInSelect}
                                    crossOrigin={undefined}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {key === "color" && (
                <div className="grid grid-cols-3 gap-5">
                    {color?.map((color: any, index: any) => {
                        const isSizeInSelect = itemValueColor?.some(
                            (selectItem: any) => selectItem.id === color.id
                        );
                        return (
                            <div
                                key={index}
                                className="flex items-center checked-button"
                            >
                                <label className="label-css">
                                    {color.color}
                                </label>

                                <Checkbox
                                    value={color}
                                    onChange={() =>
                                        handleCheckboxColorChange(color)
                                    }
                                    checked={isSizeInSelect}
                                    crossOrigin={undefined}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    ));
};

export default CheckBoxComponent;
