import { notFound } from "../middlewares/handleErrors";
import user from "./userRouter";
import auth from "./authRouter";
import color from "./warehouse/colorRouter";
import category from "./warehouse/categoryRouter";
import brand from "./warehouse/brandRouter";
import capacity from "./warehouse/capacityRouter";
import product from "./warehouse/productRouter";
import productSize from "./warehouse/productSizeRouter";
import role from "./roleRouter";
import address from "./addressRouter";
import image from "./warehouse/imageRouter";
import cart from "./cartRouter";
import orderItem from "./orderItemRouter";
import payment from "./paymentRouter";
import order from "./orderRouter";
import favourite from "./favouriteRouter";

const initRouters = (app) => {
    const initLink = "/api/v1";

    app.use(`${initLink}/users`, user);

    app.use(`${initLink}/auth`, auth);

    app.use(`${initLink}/color`, color);

    app.use(`${initLink}/category`, category);

    app.use(`${initLink}/brand`, brand);

    app.use(`${initLink}/capacity`, capacity);

    app.use(`${initLink}/product`, product);

    app.use(`${initLink}/productSize`, productSize);

    app.use(`${initLink}/role`, role);

    app.use(`${initLink}/address`, address);

    app.use(`${initLink}/image`, image);

    app.use(`${initLink}/cart`, cart);

    app.use(`${initLink}/orderItem`, orderItem);

    app.use(`${initLink}/order`, order);

    app.use(`${initLink}/payment`, payment);

    app.use(`${initLink}/favourite`, favourite);

    app.use(notFound);
};

module.exports = initRouters;
