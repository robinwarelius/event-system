export default function NavBar()
{
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-secondary-subtle">
        <div className="container-fluid">
            <a className="navbar-brand" href="#"><i className="fa-solid fa-house"></i></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="#">Create Event</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </>
    )
}