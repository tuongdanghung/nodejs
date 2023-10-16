import createError from "http-errors";

export const badRequest = (err, res) => {
    const error = createError.BadRequest(err);
    return res.status(error.status).send({
        error: true,
        message: error.message,
    });
};

export const internalServerError = (res) => {
    const error = createError.InternalServerError();
    return res.status(error.status).json({
        error: true,
        message: error.message,
    });
};

export const notFound = (res) => {
    const error = createError.NotFound("api not found");
    return res.status(error.status).json({
        error: true,
        message: error.message,
    });
};

export const notAuth = (err, res, isExprired) => {
    const error = createError.Unauthorized(err);
    return res.status(error.status).json({
        error: isExprired ? 2 : 1,
        message: error.message,
    });
};
