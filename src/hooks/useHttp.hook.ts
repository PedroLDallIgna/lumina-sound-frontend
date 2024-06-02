import { useSelector } from "react-redux"
import { RootState } from "../store"
import http from "../services/http.service";

const useHttp = (func: any) => {
    const sessionToken = useSelector<RootState>(state => state.general.sessionToken);

    http.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${sessionToken}`;
        return config
    })

    return func
}

export default useHttp;
