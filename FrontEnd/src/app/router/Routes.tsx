import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/forms/EventForm";
import EventDetails from "../../features/events/details/EventDetails";
import TestErrors from "../../features/errors/TestErrors";
import ErrorCard from "../../features/errors/ErrorCard";
import LoginForm from "../../features/users/LoginForm";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {path: 'events', element: <EventDashboard />},
            {path: 'events/:id', element: <EventDetails />},
            {path: 'login', element: <LoginForm/>},
            {path: 'addEvent', element: <EventForm key='add' />},
            {path: 'editEvent/:id', element: <EventForm key='edit' />},
            {path: 'errors', element: <TestErrors />},
            {path: 'error', element: <ErrorCard />},
            {path: '*', element: <Navigate replace to='/error' /> }
        ]
    }
]


export const router = createBrowserRouter(routes)