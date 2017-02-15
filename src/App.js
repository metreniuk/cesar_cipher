import React, { Component } from 'react';
import './App.css';

import CodeBox from './CodeBox';
import Controls from './Controls';
import map from './map';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      codeKey: 1,
      encryptText: "",
      decryptText: "",
    };
    this.onChangeKey = this.onChangeKey.bind(this);
    this.onChangeEncryptText = this.onChangeEncryptText.bind(this);
    this.onChangeDecryptText = this.onChangeDecryptText.bind(this);
    this.onEncryptClick = this.onEncryptClick.bind(this);
  }

  onChangeEncryptText(e) {
    this.setState({ encryptText: e.target.value });
  }

  onChangeDecryptText(e) {
    this.setState({ decryptText: e.target.value });
  }

  onChangeKey(e) {
    this.setState({ codeKey: e.target.value });
  }

  onEncryptClick() {
    const { encryptText } = this.state;
    const decryptText = this.decrypt(encryptText);
    this.setState({ decryptText })
  }

  decrypt(encryptText) {
    const k = +this.state.codeKey;
    let x;
    const result = encryptText.split('').map(lt => {
      for (let i in map.letters) {
        if (map.letters[i] === lt) {
          x = i;
        }
      }
      let Ek = (x + k) % 26;
      return map.letters[Ek];
    });
    return result.join('');
  }

  render() {
    return (
      <div className="app">
        <CodeBox
          type="encrypt-field"
          encryptText={this.state.encryptText}
          onChangeEncryptText={this.onChangeEncryptText}
        />

        <Controls
          codeKey={this.state.key}
          onChangeKey={this.onChangeKey}
          onEncryptClick={this.onEncryptClick}
        />

        <CodeBox
          type="decrypt-field"
          decryptText={this.state.decryptText}
          onChangeDecryptText={this.onChangeDecryptText}
        />
      </div>
    );
  }
}

export default App;
