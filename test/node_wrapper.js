const crypto = require('crypto');
const assert = require('assert');
const fs = require('fs-extra');
const sqlite3 = require('sqlite3').verbose();
const os = require('os');
const path = require('path');

function getVersion() {
  return '0.0.1';
}

function getPath(name) {
  if (name === 'appData') {
    return os.homedir();
  } else if (name === 'temp') {
    return os.tmpdir();
  } else if (name === 'res') {
    return path.join(__dirname, 'resources');
  } else {
    assert(false, `unknown path name: ${name}`);
  }
}

function getLocale() {
  return 'en';
}

const app = {
  getVersion,
  getPath,
  getLocale,
  name: 'WizNote Lite',
};


class Store {
  constructor(prefix) {
    this._prefix = prefix;
    this._map = new Map(); // demo, should save to disk
  }

  _getKey(key) {
    if (!this._prefix) {
      return key;
    }
    return `${this._prefix}/${key}`;
  }

  set(key, value) {
    this._map.set(this._getKey(key), value);
  }

  get(key) {
    this._map.get(this._getKey(key));
  }
}


const aesAlgorithmCBC = 'aes-256-cbc';

const IV_LENGTH = 16;

function passwordToKey(password) {
  const key = crypto.createHash('sha256').update(String(password)).digest('base64').substr(0, 32);
  return key;
}

function encryptText(text, password) {
  if (!text) {
    return '';
  }
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(aesAlgorithmCBC, passwordToKey(password), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const ivData = iv.toString('hex');
  const resultData = encrypted.toString('hex');
  return `${ivData}:${resultData}`;
}

function decryptText(text, password) {
  if (!text) {
    return '';
  }
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(aesAlgorithmCBC, passwordToKey(password), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const enc = {
  aes: {
    encryptText,
    decryptText,
  },
};

const wizWrapper = {
  fs,
  app,
  sqlite3,
  Store,
  enc,
  disableCjk: true,
};

global.wizWrapper = wizWrapper;
