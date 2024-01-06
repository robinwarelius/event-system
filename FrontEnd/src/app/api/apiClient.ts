import axios, { AxiosResponse } from 'axios'
import { EventDto, EventResponse } from '../types/eventTypes';

// Sätter en grundläggande URL för alla Axios-förfrågningar till vår lokala server
axios.defaults.baseURL = 'https://localhost:7000/api';

// En funktion som tar en Axios-respons och returnerar bara datan från den
const responseBody = <T> (response: AxiosResponse <T>) => response.data;

// Definierar olika HTTP-förfrågningsmetoder (get, post, put, delete) som använder Axios
const apiRequests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

// Grupperar alla HTTP-förfrågningar som rör 'Events'
const Events = {
    list: () => apiRequests.get<EventResponse>('/events/GetEvents'),
    details: (id: string) => apiRequests.get<EventResponse>(`/events/GetEvent/${id}`),
    add: (event: EventDto) => apiRequests.post<EventResponse>('/events/AddEvent', event),
    delete: (id: string) => apiRequests.delete<EventResponse>(`/events/DeleteEvent/${id}`),
    update: (event: EventDto) => apiRequests.put<EventResponse>('/events/UpdateEvent', event)
}

// Skapar ett objekt 'client' som innehåller alla våra API-förfrågningar
const client = {
    Events
}

// Exporterar 'client' så att den kan användas i andra delar av applikationen
export default client;