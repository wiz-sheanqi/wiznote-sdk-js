const axios = require('axios');
const assert = require('assert');
const i18next = require('i18next');
const { app } = global.wizWrapper;

const { WizNetworkError, WizInternalError, WizKnownError } = require('wiznote-sdk-js-share').error;


function getContentLengthFromHeaders(headers) {
  for (const key of Object.keys(headers)) {
    const lowerCaseKey = key.toLowerCase();
    if (lowerCaseKey === 'content-length') {
      return Number.parseInt(headers[key], 10);
    }
  }
  return -1;
}

function getErrorFromHeaders(headers, options) {
  let code;
  let externCode;
  for (const key of Object.keys(headers)) {
    const lowerCaseKey = key.toLowerCase();
    if (lowerCaseKey === 'x-wiz-code') {
      code = Number.parseInt(headers[key], 10);
    } else if (lowerCaseKey === 'x-wiz-externcode') {
      externCode = headers[key];
    }
  }
  //
  if (code) {
    if (code === 2000) {
      console.error(`invalid param: ${options.url}`);
    }
    return new WizKnownError('server error', code, externCode);
  }
  return null;
}

//
async function standardRequest(opt) {
  //
  const options = opt;
  assert(options, 'no options');
  //
  const token = options.token;
  //
  if (token) {
    if (!options.headers) {
      options.headers = {
        'X-Wiz-Token': token,
      };
    } else {
      options.headers['X-Wiz-Token'] = token;
    }
  }
  //
  if (options.url) {
    const version = app.getVersion();
    if (options.url.indexOf('clientType=') === -1) {
      if (options.url.indexOf('?') === -1) {
        options.url += `?clientType=lite&clientVersion=${version}`;
      } else {
        options.url += `&clientType=lite&clientVersion=${version}`;
      }
    }
  }
  //
  try {
    let result;
    if (options.method === 'post' && options.useAppPost && app.doStandardPost) {
      result = await app.doStandardPost(options);
    } else {
      result = await axios(options);
    }
    if (result.status !== 200) {
      const error = getErrorFromHeaders(result.headers, options);
      if (error) {
        throw error;
      }

      throw new WizNetworkError(result.statusText);
    }
    //
    if (!result.data) {
      throw new WizInternalError('no data returned');
    }
    //
    const data = result.data;
    if (opt.responseType !== 'arraybuffer') {
      if (data.returnCode !== 200) {
        throw new WizKnownError(data.returnMessage, data.returnCode, data.externCode);
      }
    } else {
      let byteLength;
      if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
        if (result.data.constructor === ArrayBuffer) {
          byteLength = result.data.byteLength;
        }
      }
      const headerContentLength = getContentLengthFromHeaders(result.headers);
      const dataLength = byteLength || data.length;
      if (headerContentLength !== -1) {
        if (dataLength !== headerContentLength) {
          throw new WizNetworkError(`Failed to download data, invalid content length: ${data.length}, ${headerContentLength}`);
        }
      }
    }
    //
    if (opt.returnFullResult) {
      return data;
    }
    return data.result;
  } catch (err) {
    if (err.response) {
      const headers = err.response.headers;
      const error = getErrorFromHeaders(headers, options);
      if (error) {
        throw error;
      }
    }
    if (err.code === 'ENOTFOUND') {
      throw new WizNetworkError(i18next.t('errorConnect', {
        host: err.hostname,
      }));
    }
    if (err instanceof WizKnownError) {
      throw err;
    }
    throw new WizNetworkError(err.message);
  }
}


async function downloadToData(opt) {
  const options = opt;
  options.responseType = 'blob';
  const response = await axios(options);
  if (response.status !== 200) {
    throw new WizNetworkError(response.statusText);
  }
  //
  if (!response.data) {
    throw new WizInternalError('no data returned');
  }
  return response.data;
}

module.exports = {
  standardRequest,
  downloadToData,
};
