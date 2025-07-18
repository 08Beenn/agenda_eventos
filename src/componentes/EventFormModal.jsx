import React, { useEffect, useState } from 'react';

const EventFormModal = ({ show, onClose, onSubmit, editingData }) => {
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    title: '',
    location: '',
    text: ''
  });

  useEffect(() => {
    if (editingData) {
      setFormData(editingData);
    } else {
      setFormData({
        day: '',
        month: '',
        title: '',
        location: '',
        text: ''
      });
    }
  }, [editingData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === 'month' ? value.toUpperCase() : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.day || formData.day < 1 || formData.day > 31) {
      alert('Por favor ingresa un día válido entre 1 y 31.');
      return;
    }
    if (!formData.month.match(/^[A-Z]{3}$/)) {
      alert('Por favor ingresa un mes válido de 3 letras, por ejemplo "JUL".');
      return;
    }
    if (!formData.title || !formData.location || !formData.text) {
      alert('Por favor completa todos los campos.');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <form onSubmit={handleSubmit} className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editingData ? 'Editar Evento' : 'Crear Nuevo Evento'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">

            {/* Campo Día */}
            <div className="mb-3">
              <label htmlFor="day" className="form-label">Día</label>
              <div className="input-group">
                <input
                  type="number"
                  min="1"
                  max="31"
                  className="form-control"
                  id="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text">
                  <i className="fas fa-calendar-day"></i>
                </span>
              </div>
            </div>

            {/* Campo Mes */}
            <div className="mb-3">
              <label htmlFor="month" className="form-label">Mes</label>
              <div className="input-group">
                <input
                  placeholder="Ej: JUL"
                  type="text"
                  maxLength="3"
                  className="form-control"
                  id="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text">
                  <i className="fas fa-calendar-alt"></i>
                </span>
              </div>
            </div>

            {/* Campo Título */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Título</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text">
                  <i className="fas fa-heading"></i>
                </span>
              </div>
            </div>

            {/* Campo Ubicación */}
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Ubicación</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
                <i className="bi bi-geo-alt-fill mx-4 fs-3"></i>
              </div>
            </div>

            {/* Campo Descripción */}
            <div className="mb-3">
              <label htmlFor="text" className="form-label">Descripción</label>
              <div className="input-group">
                <textarea
                  className="form-control"
                  id="text"
                  rows="3"
                  value={formData.text}
                  onChange={handleChange}
                  required
                ></textarea>
                <span className="input-group-text">
                  <i className="fas fa-align-left"></i>
                </span>
              </div>
            </div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">
              {editingData ? 'Actualizar Evento' : 'Crear Evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
