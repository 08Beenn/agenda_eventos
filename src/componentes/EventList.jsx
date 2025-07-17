// EventList - Para contener la lista de eventos y la lógica principal
import React, { useState } from 'react';
import EventCard from './EventCard';
import EventFormModal from './EventFormModal';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteSelected = () => {
    setEvents(events.filter(event => !selectedEvents.includes(event.id)));
    setSelectedEvents([]);
  };

  const toggleEventSelection = (eventId, isChecked) => {
    if (isChecked) {
      setSelectedEvents([...selectedEvents, eventId]);
    } else {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand m-2"><strong>Proximos Eventos web</strong></a>
          <div className="d-flex">
            <button
              className="btn btn-light me-2"
              onClick={() => setShowModal(true)}
            >
              Crear Evento
            </button>
            <button
              className="btn btn-danger"
              disabled={selectedEvents.length === 0}
              onClick={deleteSelected}>
              Eliminar Evento
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row g-1">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onDelete={(eventId, isChecked) => toggleEventSelection(eventId, isChecked)}
              onEdit={updateEvent}
            />
          ))}
        </div>
      </div>

      <EventFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addEvent}
      />
    </div>
  );
};

export default EventList;