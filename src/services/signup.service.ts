import backendService from "./backend";

const ENDPOINT = '/sing-up';

type SignupBody = {
    name: string;
    username: string;
    email: string;
    password: string;
    birthDate: string;
    sex: string;
}

export const signup = (data: SignupBody) => backendService.post(ENDPOINT, data);
