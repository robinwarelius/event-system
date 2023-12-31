import { useEffect, useState } from 'react';
import axios from 'axios';
import { Event } from '../models/Activity';
import NavBar from './NavBar';

function App() {
  const [events, setEvents] = useState<Event>();

  useEffect(() => {
    axios.get<Event>('https://localhost:7000/api/events/GetEvents')
      .then(response => {
        setEvents(response.data);
      })
  }, [])
 
  return (
    <>
      <NavBar/>
      <div>
        <h1>Calcifer</h1>
        <ul>
          {events?.result.map(event => (
            <li key={event.eventId}>
              {event.title}
            </li>
          ))}
        </ul>
      </div>
    </>

  )
}

export default App;
