
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEvents } from "./EventContext";
import EventPopup from "./EventPopup";
import axios from "axios";

const localizer = momentLocalizer(moment);

function CustomEvent({ event, onEdit, onDelete }) {
  const getShortTitle = (title) => {
    return title.length > 6 ? `${title.substring(0, 6)}...` : title;
  };
  return (
    <div className="custom-event" onClick={onEdit}>
      <span>{getShortTitle(event.title)}</span>
      <div className="event-actions">
        <button onClick={onEdit}>✏️</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

function AgendaEvent({ event }) {
  return (
    <div className="agenda-event">
      <h4>{event.title}</h4>
      <h6>{event.description}</h6>
    </div>
  );
}

function Month() {
  const [popup, setPopup] = useState(false);
  const [popupEvent, setPopupEvent] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    time: "",
    date: "",
    users: [], 
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const { events, setEvents, addEvent, updateEvent, deleteEvent } = useEvents();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/events`);
        if (isMounted) {
          const formattedEvents = response.data.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users`); 
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchEvents();
    fetchUsers(); 
    return () => {
      isMounted = false;
    };
  }, [setEvents]);

  const handleSelectSlot = ({ start, end }) => {
    setPopupEvent({
      title: "",
      description: "",
      start,
      end,
      date: moment(start).format("YYYY-MM-DD"),
      time: "",
      users: [], // Reset users on slot select
    });
    setEditingEvent(null);
    setPopup(true);
  };

  const handleSelectEvent = (event) => {
    setPopupEvent({
      ...event,
      date: moment(event.start).format("YYYY-MM-DD"),
      time: moment(event.start).format("HH:mm"),
    });
    setEditingEvent(event);
    setPopup(true);
  };

  const handleEventDelete = async (eventId) => {
    const filteredEvents = events.filter((event) => event._id !== eventId);
    setEvents(filteredEvents);
    try {
      await deleteEvent(eventId);
    } catch (error) {
      console.error("Error deleting event:", error);
      setEvents((prevEvents) => [
        ...prevEvents,
        filteredEvents.find((event) => event._id === eventId),
      ]);
    }
  };
  const popupSave = async () => {
        if (popupEvent.title && popupEvent.startTime && popupEvent.date && popupEvent.endTime && popupEvent.users.length > 0) {
            try {
                // Create a date object from the date input
                const eventDate = new Date(popupEvent.date);
    
                // Split time into hours and minutes for start and end times
                const [startHours, startMinutes] = popupEvent.startTime.split(":").map(Number);
                const [endHours, endMinutes] = popupEvent.endTime.split(":").map(Number);
    
                // Set the start and end times
                const startDateTime = new Date(eventDate);
                startDateTime.setHours(startHours, startMinutes);
    
                const endDateTime = new Date(eventDate);
                endDateTime.setHours(endHours, endMinutes);
    
                // Ensure end time is after start time
                if (endDateTime <= startDateTime) {
                    throw new Error("End time must be after start time.");
                }
    
                const updatedEvent = {
                    title: popupEvent.title, // Ensure title is present
                    description: popupEvent.description, // Optional, but included
                    start: startDateTime.toISOString(),
                    end: endDateTime.toISOString(),
                    date: popupEvent.date, // Include the date if needed
                    time: `${startHours}:${startMinutes}`, 
                    users: popupEvent.users,
                };
    
                // Proceed with adding or updating the event
                if (editingEvent) {
                    await updateEvent(editingEvent._id, updatedEvent);
                    setEvents((prevEvents) =>
                        prevEvents.map((event) =>
                            event._id === editingEvent._id ? { ...event, ...updatedEvent } : event
                        )
                    );
                } else {
                    const newEvent = await addEvent(updatedEvent);
                    setEvents((prevEvents) => [...prevEvents, newEvent]);
                }
                setPopup(false);
            } catch (error) {
                console.error("Error saving event:", error.response ? error.response.data : error);
            }
        } else {
            console.error("Missing required fields: Title, startTime, date, and endTime.");
        }
    };
    
  const popupClose = () => {
    setPopup(false);
    setPopupEvent({
      title: "",
      description: "",
      start: new Date(),
      end: new Date(),
      time: "",
      date: "",
      users: [],
    });
    setEditingEvent(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div style={{ height: "600px", overflowY: "auto" }}>
        <Calendar
          localizer={localizer}
          events={events.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", overflowY: "auto" }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          components={{
            event: ({ event }) => (
              <CustomEvent
                event={event}
                onEdit={() => handleSelectEvent(event)}
                onDelete={() => handleEventDelete(event._id)}
              />
            ),
            agenda: {
              event: AgendaEvent,
            },
          }}
        />
      </div>

      <EventPopup
        popup={popup}
        setPopup={setPopup}
        popupEvent={popupEvent}
        setPopupEvent={setPopupEvent}
        popupSave={popupSave}
        editingEvent={editingEvent}
        users={users} 
      />
    </div>
  );
}

export default Month;
