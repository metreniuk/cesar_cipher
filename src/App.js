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
      codeKey: 4,
      encryptText: "",
      decryptText: "",
      results: ""
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
        x = getLetterId(lt, map.letters);
        let Ek = mod(x + k, 26);
        return map.letters[Ek];
      });
      result.push(decryptedWord.join(''));
    });
    return result.join(' ');
  }

  onDecryptClick() {
    const { decryptText } = this.state;
    const { res, j } = this.decrypt(decryptText);
    this.setState({
      encryptText: res,
      codeKey: j,
      results: res
    });
    console.log(j);
  }

  decrypt(decryptText) {
    decryptText = decryptText.toLowerCase();
    let y, matchedWords = [];
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
          // (y - k) < 0 ? Dk = 26 - Math.abs(y - k) : Dk = (y - k) % 26;
          Dk = mod(y - k, 26);
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
            matchedWords.push(word);
          }
        }
      });
      if (matchedWords.length >= encryptedWords.length * 0.1) {
        console.log(matchedWords);
        console.log(encryptedWords.length * 0.1);
        guess = j;
        const res = decryptByKey(encryptedWords, j);
        return { res, j};
      }
      matchedWords = [];
    }
  }

  render() {
    return (
      <div className="app">
        <div className="main">
          <CodeBox
              type="encrypt-field"
              encryptText={this.state.encryptText}
              onChangeEncryptText={this.onChangeEncryptText}
          />

          <Controls
              codeKey={this.state.codeKey}
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
        <h3>The key: {this.state.codeKey}</h3>
        <p>{this.state.results}</p>
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
  result = result.join(' ');
  return result;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function getLetterId(lt, letters) {
  for (let i in letters) {
    if (letters[i] === lt) {
      return +i;
    }
  }
}

export default App;
