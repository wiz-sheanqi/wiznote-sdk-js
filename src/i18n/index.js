const i18next = require('i18next');
const en = require('./en.json');
const cn = require('./zh-cn.json');
const tw = require('./zh-tw.json');
const merge = require('lodash/merge');

const {
  app,
} = global.wizWrapper;


const sdkResources = {
  en: {
    translation: en,
  },
  'zh-CN': {
    translation: cn,
  },
  'zh-TW': {
    translation: tw,
  },
};

let currentLang = 'en';

async function i18nInit(resources) {
  const locale = app.getLocale();
  const currentLocale = locale;
  currentLang = resources[currentLocale] ? currentLocale : 'en';
  //
  await i18next.init({
    lng: currentLang,
    debug: false,
    resources: merge({}, sdkResources, resources),
  });
}

function getCurrentLang() {
  return currentLang;
}

module.exports = {
  i18nInit,
  getCurrentLang,
};
