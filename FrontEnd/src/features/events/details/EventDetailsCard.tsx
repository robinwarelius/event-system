import { NavLink } from "react-router-dom";
import { useStore } from "../../../app/store/store";

export default function EventDetailsHeader () {
    const {eventStore} = useStore();
    const {selectedEvent} = eventStore;

    return <>

     <div className="card text-bg-dark">
       <img src={`/assets/images/${selectedEvent?.category}.jpg`} className="card-img"/>
      <div className="card-img-overlay">
        <h5 className="card-title">{selectedEvent?.title}</h5>
        <p className="card-text"><small>{selectedEvent?.date}</small></p>
      </div>
    </div>

    <div className="card mt-2">
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><i className="me-md-4 fa-solid fa-circle-info"></i>{selectedEvent?.details}</li>
            <li className="list-group-item"><i className="me-md-4 fa-solid fa-location-dot"></i>{selectedEvent?.city} | {selectedEvent?.placeVenue}</li>
            <li className="list-group-item"><i className="me-md-4 fa-solid fa-list"></i>{selectedEvent?.category}</li>
            <div className="list-group-item d-grid gap-2 d-md-flex justify-content-md-end">
            <NavLink to={`/editEvent/${selectedEvent?.eventId}`} className="btn btn-primary me-md-2 mt-2">Edit</NavLink>
            <NavLink to={"/events"} className="btn btn-danger me-md-2 mt-2">Cancel</NavLink>    
            </div>
        </ul>
    </div>
    </>
}