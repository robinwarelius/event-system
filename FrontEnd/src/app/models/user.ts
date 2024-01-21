export interface User {
    username: string;
    displayname: string;
    token: string;
    imgage?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayname?: string;
    username?: string
}