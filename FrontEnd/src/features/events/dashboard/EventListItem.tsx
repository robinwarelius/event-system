import { NavLink } from "react-router-dom"
import { EventDto } from "../../../app/types/eventTypes"
import { useStore } from "../../../app/store/store";

interface Props {
    event: EventDto
}

export default function EventListItem ({event}: Props){
    const {eventStore} = useStore();
    const {deleteEvent} = eventStore

    return(
        <>
            <div key={event.eventId} className="card custom-bg mt-3">
                <h5 className="card-header">{event.title}</h5>
                <div className="card-body">
                <p className="card-text"><i className="me-3 fa-regular fa-clock"></i>{event.date}</p>
                <p className="card-text"><i className="me-3 fa-solid fa-earth-americas"></i>{event.city} | {event.placeVenue}</p>
                <p className="card-text"><i className="me-3 fa-solid fa-circle-info"></i>{event.details}</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <NavLink to={`/events/${event.eventId}`} className="btn btn-dark">View</NavLink>
                    <a href="#" onClick={() => deleteEvent(event.eventId)} className="btn btn-danger">Delete</a>
                </div>
                </div>
             </div>
        </>
    )
}