import React from 'react';

const CodeBox = ({ type, encryptText, decryptText, onChangeEncryptText, onChangeDecryptText }) => {
  if (type === "encrypt-field") {
    return (
      <div className="code-box">
      <textarea
        name={type} id={type} className="text-field"
        onChange={onChangeEncryptText}
        value={encryptText}
      />
      </div>
    );
  } else {
    return (
      <div className="code-box">
      <textarea
        name={type} id={type} className="text-field"
        onChange={onChangeDecryptText}
        value={decryptText}
      />
      </div>
    );
  }

};

export default CodeBox;