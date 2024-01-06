import { NavLink } from "react-router-dom";

export default function NavBar()
{
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-dark mb-5" data-bs-theme="dark">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to={"/"}><i className="fa-solid fa-house"></i></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" to={"/events"}>Events</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={"/addEvent"}>Create Event</NavLink>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </>
    )
}