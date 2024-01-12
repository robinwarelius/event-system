import React, { useState } from 'react';
import axios from 'axios';

export default function TestErrors() {
    const baseUrl = 'https://localhost:7000/api/events';
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + '/GetEvent/c97288ab-f317-4f9b-ade1-08dc0faaf47d').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + '/GetEvents').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + '/AddEvent', {}).catch(err => console.log("sp"));
    }

    return (
        <>
            <h3  content='Test Error component' />
            <button onClick={handleValidationError}>400</button>
           <button onClick={handleNotFound}>NOT FOUND</button>
           <button onClick={handleBadRequest}>Bad Request</button>      
        </>
    )
}