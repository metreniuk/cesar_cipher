import React, { Component } from 'react';
import './App.css';

import CodeBox from './CodeBox';
import Controls from './Controls';

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
    console.log('hi');
    const { encryptText } = this.state;
    this.setState({ decryptText: encryptText })
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
