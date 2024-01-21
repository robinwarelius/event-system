import axios, { AxiosError, AxiosResponse } from 'axios'
import { EventDto, EventResponse } from '../models/event';
import { router } from '../router/Routes';
import { toast } from 'react-toastify';
import { User, UserFormValues } from '../models/user';

// Sätter en grundläggande URL för alla Axios-förfrågningar till vår lokala server
axios.defaults.baseURL = 'https://localhost:7000/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

// En funktion som tar en Axios-respons och returnerar bara datan från den
const responseBody = <T> (response: AxiosResponse <T>) => response.data;

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:     
            toast.error(data);
            router.navigate('/error'); 
            break;
        case 401: 
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            toast.error('not found')
            router.navigate('/error');
            break;
        case 500:
            toast.error('internal server error')
            router.navigate('/error');
            break;
    }
    return Promise.reject(error);
})

// Definierar olika HTTP-förfrågningsmetoder (get, post, put, delete) som använder Axios
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

// Grupperar alla HTTP-förfrågningar som rör 'Events'
const Events = {
    list: () => requests.get<EventResponse>('/events/GetEvents'),
    details: (id: string) => requests.get<EventResponse>(`/events/GetEvent/${id}`),
    add: (event: EventDto) => requests.post<EventResponse>('/events/AddEvent', event).then(() => console.log("wsp")),
    delete: (id: string) => requests.delete<EventResponse>(`/events/DeleteEvent/${id}`),
    update: (event: EventDto) => requests.put<EventResponse>('/events/UpdateEvent', event)
}

// Grupperar alla HTTP-förfrågningar som rör 'Auth'
const Auth = {
    current: () => requests.get<User>('/auth/GetCurrentUser'),
    login: (user: UserFormValues) => requests.post<User>('/auth/login', user),
    register: (user: UserFormValues) => requests.post<User>('/auth/register', user)
}

// Skapar ett objekt 'client' som innehåller alla våra API-förfrågningar
const agent = {
    Events,
    Auth
}

// Exporterar 'client' så att den kan användas i andra delar av applikationen
export default agent;


