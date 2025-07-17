// EventCard - Para mostrar cada tarjeta de evento 
import React, { useState } from 'react';

const EventCard = ({ event, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [eventData, setEventData] = useState(event);

  const handleEdit = () => {
    if (editing) {
      // Guardar cambios
      const updatedEvent = {
        ...eventData,
        day: eventData.day,
        month: eventData.month,
        title: eventData.title,
        location: eventData.location,
        text: eventData.text
      };
      onEdit(updatedEvent);
    }
    setEditing(!editing);
  };

  const handleChange = (e, field) => {
    setEventData({
      ...eventData,
      [field]: e.target.textContent
    });
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-1">
      <div className="card h-100">
        <input
          type="checkbox"
          className="select-checkbox"
          title="Seleccionar carta"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(!isChecked)
            onDelete(event.id, e.target.checked)
          }}
        />
        <div className="pt-2" id="dateBox">
          {editing ? (
            <span
              className="month"
              style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}
              contentEditable
              onBlur={(e) => handleChange(e, 'month')}
              dangerouslySetInnerHTML={{ __html: eventData.month }}
            />
          ) : (
            <span className="month" style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>
              {eventData.month}
            </span>
          )}
          {editing ? (
            <span
              className="day"
              style={{ fontSize: '1.8rem' }}
              contentEditable
              onBlur={(e) => handleChange(e, 'day')}
              dangerouslySetInnerHTML={{ __html: eventData.day }}
            />
          ) : (
            <span className="day" style={{ fontSize: '1.8rem' }}>{eventData.day}</span>
          )}

        </div>
        <div className="card-body">
          {editing ? (
            <h5
              className="card-title"
              contentEditable
              onBlur={(e) => handleChange(e, 'title')}
              dangerouslySetInnerHTML={{ __html: eventData.title }}
            />
          ) : (
            <h5 className="card-title">{eventData.title}</h5>
          )}
          {editing ? (
            <h6
              className="card-location mb-2 text-muted"
              contentEditable
              onBlur={(e) => handleChange(e, 'location')}
              dangerouslySetInnerHTML={{ __html: eventData.location }}
            />
          ) : (
            <h6 className="card-location mb-2 text-muted">{eventData.location}</h6>
          )}
          {editing ? (
            <p
              className="card-text"
              contentEditable
              onBlur={(e) => handleChange(e, 'text')}
              dangerouslySetInnerHTML={{ __html: eventData.text }}
            />
          ) : (
            <p className="card-text">{eventData.text}</p>
          )}
          <div className="d-grid gap-2 col-6 mx-aut">
            <button
              type="button"
              className={`btn btn-sm ${editing ? 'btn-success' : 'btn-light'}`}
              onClick={handleEdit}
            >
              {editing ? 'Guardar' : 'Editar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;