import React, { useState, useEffect } from 'react';
import EventFormModal from './EventFormModal';

const App = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  const saveToLocalStorage = (updatedEvents) => {
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const handleAddEvent = (newEvent) => {
    if (editingEvent !== null) {
      const updatedEvents = events.map((event, index) =>
        index === editingEvent ? newEvent : event
      );
      setEvents(updatedEvents);
      saveToLocalStorage(updatedEvents);
      setEditingEvent(null);
    } else {
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      saveToLocalStorage(updatedEvents);
    }
  };

  const handleDeleteEvent = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este evento?')) {
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
      saveToLocalStorage(updatedEvents);
    }
  };

  const handleEditEvent = (index) => {
    setEditingEvent(index);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={() => { setShowModal(true); setEditingEvent(null); }}>
        Crear Nuevo Evento
      </button>

      <div className="row">
        {events.map((event, index) => (
          <div className="col-md-4" key={index}>
            <div className="card mb-3">
              <div className="card-header">{event.day} {event.month}</div>
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.text}</p>
                <p className="card-text"><small className="text-muted">{event.location}</small></p>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditEvent(index)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteEvent(index)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <EventFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddEvent}
        editingData={editingEvent !== null ? events[editingEvent] : null}
      />
    </div>
  );
};

export default App;
