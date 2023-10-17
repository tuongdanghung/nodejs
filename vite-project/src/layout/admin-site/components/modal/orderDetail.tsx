import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    Typography,
} from "@material-tailwind/react";
interface DataItem {
    title: string;
    open: boolean;
    detail: any;
    handleClose: (open: boolean) => void;
    totalOrder: (total: Number) => void;
}
const TABLE_HEAD = [
    "MDH",
    "Image",
    "Quantity",
    "Capacity",
    "Color",
    "Price",
    "Total",
];
const ModalOrderComponent: React.FC<DataItem> = (props: any) => {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(props.detail);
    useEffect(() => {
        setOpen(props.open);
        setDetail(props.detail);
    }, [props.open, props.detail]);
    const handleClose = () => {
        props.handleClose(false);
    };

    let totalPrice = 0;

    detail?.map((item: any) => {
        const priceProduct =
            item.productSize.product.price * item.productSize.capacity.percent;
        totalPrice += priceProduct;
    });

    return (
        <Dialog
            className="modal-dialog"
            open={open}
            handler={props.handleClose}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader>{props.title}</DialogHeader>
            <DialogBody divider>
                <Card className="h-full w-full rounded-none">
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
                            {detail?.map((item: any, index: any) => {
                                const isLast = index === detail?.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";
                                const priceProduct =
                                    item.productSize.product.price *
                                    item.productSize.capacity.percent;
                                return (
                                    <tr key={item.id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item.productSize.product.title}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                <img
                                                    width={60}
                                                    src={
                                                        item.productSize.product
                                                            .image[0].src
                                                    }
                                                    alt=""
                                                />
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {item.quantity}
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
                                                {item.productSize.capacity.size}
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
                                                {item.productSize.color.color}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {priceProduct.toLocaleString(
                                                    "en-US"
                                                )}
                                                $
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {(
                                                    priceProduct * item.quantity
                                                ).toLocaleString("en-US")}
                                                $
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
                <p className="p-4 text-right">
                    SubTotal: {totalPrice.toLocaleString("en-US")} $
                </p>
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
            </DialogFooter>
        </Dialog>
    );
};

export default ModalOrderComponent;
