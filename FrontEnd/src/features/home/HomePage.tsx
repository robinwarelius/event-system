import { NavLink } from "react-router-dom";

export default function HomePage(){
    return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div>
            <h1 className="text-center">Home page</h1>
            <div className="text-center">
                 <NavLink to={"/login"} className="btn btn-primary"> Login </NavLink>
            </div>
        </div>
    </div>
    )
}