import { axiosInstance } from './AxiosConfig';

export const authApi = {
    loginRequest(data: String): Promise<{ access_token: string; data: User }> {
        return axiosInstance.post('auth/login', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json'
            }
        });
    }
};
