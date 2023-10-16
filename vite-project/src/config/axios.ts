import axios, { AxiosResponse, AxiosError } from "axios";

const instance = axios.create({
    baseURL: `http://localhost:5000/api/v1/`,
});
const cancelTokenSource = axios.CancelToken.source();

instance.interceptors.request.use(
    function (config: any) {
        config.cancelToken = cancelTokenSource.token;
        let localData = window.localStorage.getItem("persist:auth");
        if (localData && typeof localData === "string") {
            const accessToken = JSON.parse(localData)?.token || {};
            config.headers = { authorization: "Bearer " + accessToken };
            return config;
        } else {
            return config;
        }
    },
    function (error: AxiosError) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response: AxiosResponse) {
        // Kiểm tra điều kiện trước khi hủy
        if (response.data.shouldCancelRequest) {
            cancelTokenSource.cancel("Request cancelled based on condition");
        }
        return response;
    },
    function (error: AxiosError) {
        return Promise.reject(error.response?.data);
    }
);

export default instance;
