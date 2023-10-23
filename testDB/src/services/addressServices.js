import {
    createAddressRepository,
    getAllAddressRepository,
    getOneAddressRepository,
    updateAddressRepository,
    deleteAddressRepository,
} from "../repositories/addressRepository";
export const createAddress = async ({
    province,
    district,
    ward,
    userId,
    phone,
}) => {
    try {
        const response = await createAddressRepository({
            province,
            district,
            ward,
            userId,
            phone: +phone,
        });
        return {
            success: response[1] ? true : false,
            mes: response[1]
                ? "Tạo địa chỉ thành công"
                : "Tạo địa chỉ thất bại",
        };
    } catch (error) {
        return error;
    }
};

export const getAllAddress = async () => {
    try {
        const response = await getAllAddressRepository();
        const addresses = response.map((address) => address.toJSON());
        return {
            success: true,
            data: addresses,
        };
    } catch (error) {
        return error;
    }
};

export const getOneAddress = async ({ id }) => {
    try {
        const response = await getOneAddressRepository({ id });
        if (response?.dataValues === undefined) {
            return {
                success: false,
            };
        }
        return {
            success: true,
            data: response?.dataValues,
        };
    } catch (error) {
        return error;
    }
};

export const updateAddress = async (id, body) => {
    try {
        const response = await updateAddressRepository(id, body.addressData);
        return {
            success: response > 0 ? true : false,
            message:
                response > 0
                    ? `Address updated successfully`
                    : `Address not found`,
        };
    } catch (error) {
        return error;
    }
};

export const deleteAddress = async ({ id }) => {
    try {
        await deleteAddressRepository({ id });
        return {
            success: true,
            message: `Delete address successfully`,
        };
    } catch (error) {
        return error;
    }
};
