import { makeAutoObservable } from "mobx";

export default class CommonStore {
    token: string | null | undefined = null;

    constructor() {
        makeAutoObservable(this)
    }

    setToken = (token: string | null) => {
        if(token){
            localStorage.setItem('jwt', token); // sätter token i local storage
            this.token = token;
        }
    }
}