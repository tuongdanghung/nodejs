import jwt from "jsonwebtoken";
const generateAccessToken = (id, firstName, lastName, email, roleId) =>
    jwt.sign(
        { id, firstName, lastName, email, roleId },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
    );
module.exports = {
    generateAccessToken,
};
