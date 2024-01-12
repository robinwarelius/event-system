import { useState, ChangeEvent, useEffect } from "react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { EventDto } from "../../../app/types/eventTypes";
import {v4 as uuid} from 'uuid'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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


    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        city: Yup.string().required('City is required'),
        placeVenue: Yup.string().required('Place is required'),
        date: Yup.string().required('Date is required'),
        details: Yup.string().required('Details is required'),
        category: Yup.string().required('Category is required'),
    });

    useEffect(() => {
        if (id) loadEvent(id).then(event => setEvent(event!));
    }, [id, loadEvent]);

   function handleFormSubmit(event: EventDto) {
        console.log("wsp")
        if (event.eventId.length === 0) {
            let newEvent = {
                ...event,
                eventId: uuid()
            };
            console.log(newEvent)
            addEvent(newEvent).then(() => navigate(`/events/${newEvent.eventId}`))
        } else {
            console.log(event)
            updateEvent(event).then(() => navigate(`/events/${event.eventId}`))
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6">
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={event}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>

                    {id? <h2 className="mb-3">Update Event</h2> : <h2 className="mb-3">Create Event</h2> }

                    <div className="mb-3">
                        <div className="input-group">
                        <span className="input-group-text">Title</span>
                            <Field className="form-control" name='title' />
                        </div>
                        <ErrorMessage name='title' render={error => <p className="text-danger">{error}</p>} />
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                        <span className="input-group-text">City</span>
                        <Field className="form-control" name='city' />
                        </div>
                        <ErrorMessage name='city' render={error => <p className="text-danger">{error}</p>} />
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                        <span className="input-group-text">Place</span>
                        <Field className="form-control" name='placeVenue' />
                        </div>
                        <ErrorMessage name='placeVenue' render={error => <p className="text-danger">{error}</p>} />
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                        <span className="input-group-text">Date</span>
                        <Field type='date' className="form-control" name='date' />
                        </div>
                        <ErrorMessage name='date' render={error => <p className="text-danger">{error}</p>} />
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                        <span className="input-group-text">Details</span>
                        <Field as='textarea' className="form-control" name='details' />
                        </div>
                        <ErrorMessage name='details' render={error => <p className="text-danger">{error}</p>} />
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">Category</span>
                            <Field as="select" name="category" className="form-control custom-select">
                                <option disabled value=''>Category...</option>
                                <option value="food">Food</option>
                                <option value="movie">Movie</option>
                                <option value="party">Party</option>
                                <option value="sport">Sport</option>
                                <option value="culture">Culture</option>
                            </Field>
                        </div>
                        <ErrorMessage name='category' render={error => <p className="text-danger">{error}</p>} />
                    </div>


                    <div className="list-group-item d-grid gap-2 d-md-flex justify-content-md-end">
                        <button disabled={!isValid || !dirty || isSubmitting} type='submit' className="btn btn-primary me-md-2 mt-2">Add</button>
                        <NavLink to={"/events"} className="btn btn-danger me-md-2 mt-2">Cancel</NavLink>    
                    </div>
                    </Form>
                )}
            </Formik>
            </div>
        </div>
    )
})




