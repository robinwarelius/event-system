import { NavLink } from "react-router-dom";


export default function ErrorCard() {
    return (
    <div className='row justify-content-center'>
        <div className="col-lg-6">
            <div className="alert alert-dark text-center" role="alert">
                <div className="icon-container d-flex justify-content-center">
                    <i className="fa-solid fa-triangle-exclamation fa-3x mb-4"></i>
                </div>
                <h2>Oops - An unexpected error occurred!</h2>
                <NavLink type="button" className="btn btn-dark mt-4" to='/events'>Return To Events</NavLink>
            </div>
        </div>
    </div>
    )
}