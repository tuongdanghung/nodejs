import { ChangeEvent, useEffect, useState } from "react";
import { GetOneAddress } from "../../../../store/actions";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";

type Props = {
    // dataMap: any;
    user: any;
    handleAddressId: any;
};

const MapComponent = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [province, setProvince] = useState<any>("");
    const [user, setUser] = useState<any>({});
    useEffect(() => {
        setUser(props.user);
    }, [props]);

    const handleProvinceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptionValue = event.target.value;
        props.handleAddressId(event.target.value);
        setProvince(selectedOptionValue);
        dispatch(GetOneAddress(selectedOptionValue));
    };
    return (
        <div>
            <h2 className="font-semibold text-xl py-4">Delivery address</h2>
            <div className="flex flex-col gap-4">
                <select
                    value={province ? province : ""}
                    onChange={handleProvinceChange}
                >
                    <option value="">Choose Option</option>
                    {user?.address?.map((item: any, index: number) => {
                        return (
                            <option key={index} value={item.id}>
                                {`${item.province} - ${item.district} - ${item.ward}`}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default MapComponent;
