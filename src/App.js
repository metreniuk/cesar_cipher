import React, { Component } from 'react';
import './App.css';

import CodeBox from './CodeBox';
import Controls from './Controls';
import map from './map';
const englishWords = require('./words.json');

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
    this.onDecryptClick = this.onDecryptClick.bind(this);
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
    const decryptText = this.encrypt(encryptText);
    this.setState({ decryptText })
  }

  encrypt(encryptText) {
    const k = +this.state.codeKey;
    encryptText = encryptText.toLowerCase();
    let x;
    let encryptWords = encryptText.split(' ');
    let result = [];
    encryptWords.forEach(word => {
      let decryptedWord = word.split('').map(lt => {
        for (let i in map.letters) {
          if (map.letters[i] === lt) {
            x = +i;
          }
        }
        let Ek = mod(x + k, 26);
        return map.letters[Ek];
      });
      result.push(decryptedWord.join(''));
    });
    return result.join(' ');
  }

  onDecryptClick() {
    const { decryptText } = this.state;
    const encryptText = this.decrypt(decryptText);
    // this.setState({ encryptText })
  }

  decrypt(decryptText) {
    decryptText = decryptText.toLowerCase();
    let y, counter = 0;
    let encryptedWords = decryptText.split(' ');
    let decryptedWords = [];
    let guess;

    encryptedWords.forEach(word => {
      let lettersY = [];
      word.split('').forEach(lt => {
        for (let i in map.letters) {
          if (map.letters[i] === lt) {
            lettersY.push(i)
          }
        }
      });

      for (let k = 1; k < 26; k++) {
        let decryptedWord = lettersY.map(y => {
          let Dk;
          (y - k) < 0 ? Dk = 26 - Math.abs(y - k) : Dk = (y - k) % 26;
          // Dk = mod(y - k, 26);
          return map.letters[Dk];
        });
        decryptedWord = decryptedWord.join('');
        decryptedWords[k] ? decryptedWords[k] = decryptedWords[k] : decryptedWords[k] = [];
        decryptedWords[k].push(decryptedWord);
      }
    });

    for (let j = 1; j < 26; j ++) {
      decryptedWords[j].forEach(word => {
        for (let i in englishWords) {
          if (word === englishWords[i]) {
            counter++;
          }
        }
      });
      if (counter > 3) {
        guess = j;
        decryptByKey(decryptedWords[j], j);
        counter = 0;
      }
    }
    console.log(`The key is ${guess}`);

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
          onDecryptClick={this.onDecryptClick}
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

function decryptByKey(encryptedWords, k) {
  let result = [], y;
  encryptedWords.forEach(word => {
    let decryptedWord = word.split('').map(lt => {
      for (let i in map.letters) {
        if (map.letters[i] === lt) {
          y = +i;
        }
      }
      let Dk = mod(y - k, 26);
      return map.letters[Dk];
    });
    result.push(decryptedWord.join(''));
  });
  console.log(result.join(' '));
  return result.join(' ');
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default App;
