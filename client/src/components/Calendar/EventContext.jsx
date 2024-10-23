

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const EventContext = createContext();

export const useEvents = () => {
  return useContext(EventContext);
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = async (eventData) => {
    const response = await axios.post('http://localhost:5000/api/events', eventData);
    return response.data; // Make sure to return the created event
  };

  const updateEvent = async (eventId, updatedData) => {
    const response = await axios.put(`http://localhost:5000/api/events/${eventId}`, updatedData);
    return response.data; // Return the updated event
  };

  const deleteEvent = async (eventId) => {
    await axios.delete(`http://localhost:5000/api/events/${eventId}`);
  };

  return (
    <EventContext.Provider value={{ events, setEvents, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
