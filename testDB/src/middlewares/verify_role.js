import { notAuth } from "./handleErrors";

export const isAdmin = (req, res, next) => {
    // check xem account có phải admin hay không
    const { roleId } = req.user;
    if (roleId !== 1) return notAuth("Require role Admin", res);
    next();
};
// Authorization
