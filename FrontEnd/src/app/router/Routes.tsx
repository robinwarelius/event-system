import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/forms/EventForm";
import EventDetails from "../../features/events/details/EventDetails";
import TestErrors from "../../features/errors/TestErrors";
import ErrorCard from "../../features/errors/ErrorCard";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {path: '', element: <HomePage />},
            {path: 'events', element: <EventDashboard />},
            {path: 'events/:id', element: <EventDetails />},
            {path: 'addEvent', element: <EventForm key='add' />},
            {path: 'editEvent/:id', element: <EventForm key='edit' />},
            {path: 'errors', element: <TestErrors />},
            {path: 'error', element: <ErrorCard />},
            {path: '*', element: <Navigate replace to='/error' /> }
        ]
    }
]


export const router = createBrowserRouter(routes)