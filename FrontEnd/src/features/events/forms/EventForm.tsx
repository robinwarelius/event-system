import { useState, ChangeEvent, useEffect } from "react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { EventDto } from "../../../app/types/eventTypes";
import {v4 as uuid} from 'uuid'

export default observer (function EventForm() {

    const {eventStore} = useStore();
    const {addEvent, updateEvent, loadEvent} = eventStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventDto>({
        eventId: '',
        title: '',
        city: '',
        placeVenue: '',
        date: '',
        details: '',
        category: ''
    })

    useEffect(() => {
        if (id) {
            loadEvent(id).then(loadedEvent => {
                if (loadedEvent) setEvent(loadedEvent);
            });
        }
    }, [id, loadEvent]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            if (!event.eventId) {
                event.eventId = uuid();
                await addEvent(event).then(() => navigate(`/events/${event.eventId}`))
                
            } else {
                await updateEvent(event).then(() => navigate(`/events/${event.eventId}`))
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        }
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setEvent({...event, [name]: value});
    }

    return (
        <div className="card">
            <div className="card-body">             
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="mb-3">
                       <label className="form-label">Title</label>
                       <input className="form-control" value={event.title} name='title' onChange={handleOnChange} /> 
                   </div>
                   <div className="mb-3">
                       <label className="form-label">City</label>
                       <input name="city" value={event.city} className="form-control" onChange={handleOnChange}/>
                   </div>
                   <div className="mb-3">
                       <label className="form-label">Place</label>
                       <input name="placeVenue" value={event!.placeVenue} className="form-control" onChange={handleOnChange}/>
                   </div>
                   <div className="mb-3">
                       <label className="form-label">Date</label>
                       <input type="date" name="date" value={event!.date} className="form-control" onChange={handleOnChange}/>
                   </div>
                   <div className="mb-3">
                       <label className="form-label">Details</label>
                       <textarea name="details" value={event!.details} className="form-control" onChange={handleOnChange}></textarea>
                   </div>
                   <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select name="category" value={event!.category} className="form-select" onChange={handleOnChange}>
                             <option value="" disabled>Välj en kategori...</option>
                            <option value="food">Food</option>
                            <option value="movie">Movie</option>
                            <option value="party">Party</option>
                            <option value="sport">Sport</option>
                            <option value="culture">Culture</option>
                        </select>
                  </div>
                 
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end card-body">
                        <button type="submit" className="btn btn-success me-md-2">Submit</button>
                        <NavLink to={"/events"} type="submit" className="btn btn-danger">Cancel</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
})


// e: React.FormEvent<HTMLFormElement>
//         // e.preventDefault();