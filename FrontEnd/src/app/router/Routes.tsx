import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/forms/EventForm";
import EventDetails from "../../features/events/details/EventDetails";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {path: '', element: <HomePage />},
            {path: 'events', element: <EventDashboard />},
            {path: 'events/:id', element: <EventDetails />},
            {path: 'addEvent', element: <EventForm key='add' />},
            {path: 'editEvent/:id', element: <EventForm key='edit' />}
        ]
    }
]


export const router = createBrowserRouter(routes)