import axiosClient from "./axiosClient";



class UserAPI {
    HandleUser = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete' | 'patch',
    ) => {
        return await axiosClient(`/users${url}`, {
            method: method ?? 'get',
            data
        });
    }
}


const userApi = new UserAPI();

export default userApi;