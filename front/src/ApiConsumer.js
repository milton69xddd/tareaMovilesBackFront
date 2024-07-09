import React, { useState } from 'react';
import axios from 'axios';

const ApiConsumer = () => {
  const [text, setText] = useState('');
  const [label, setLabel] = useState('');

  const classifyText = async () => {
    try {
      const response = await axios.post('http://localhost:5000/clasificar', { texto: text });
      setLabel(response.data.label);
    } catch (error) {
      console.error('Error al clasificar el texto', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Clasificación de Texto</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Introduce el texto aquí"
        rows="10"
        cols="50"
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}
      />
      <br />
      <button
        onClick={classifyText}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Clasificar
      </button>
      <br />
      {label && (
        <div style={{ marginTop: '20px', fontSize: '20px', color: 'green' }}>
          <strong>Etiqueta:</strong> {label}
        </div>
      )}
    </div>
  );
};

export default ApiConsumer;
