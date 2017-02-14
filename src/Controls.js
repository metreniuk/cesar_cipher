import React from 'react';

const Controls = ({ codeKey, onChangeKey, onEncryptClick }) => {
  return (
    <div className="controls">
      <button id="encrypt" onClick={onEncryptClick} > Encrypt </button>
      <div className="controls-key">
        <label htmlFor="key">Key:</label>
        <input type="number" id="key" min="1" max="26"
               value={codeKey}
               onChange={onChangeKey}
        />
      </div>
      <button id="decrypt"> Decrypt </button>
    </div>
  )
};

export default Controls;