import React, { useState } from 'react';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://notificacionesbackend.onrender.com/api/subscriptions/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message, link }),
      });

      if (!res.ok) {
        throw new Error('Error al enviar la notificación');
      }

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      console.error(error);
      setResponse('Error al enviar la notificación');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="card shadow" style={{ maxWidth: '500px' }}>
          <div className="card-header bg-primary text-white text-center">
            <h2>Enviar Notificación</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Título:
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Escribe el título aquí"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Mensaje:
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje aquí"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="link" className="form-label">
                  Enlace:
                </label>
                <input
                  type="url"
                  id="link"
                  className="form-control"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Escribe el enlace aquí"
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Enviar Notificación
                </button>
              </div>
            </form>
            {response && (
              <div className="alert alert-success mt-3" role="alert">
                {response}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
