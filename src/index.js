const assert = require('assert');
const i18next = require('i18next');

const i18n = require('./i18n');
const users = require('./user/users');
const globalSettings = require('./settings/global_settings');

assert(global.wizWrapper, 'wizWrapper must be initialized before using wiznote sdk');

async function i18nInit(resources) {
  await i18n.i18nInit(resources);
}

function getCurrentLang() {
  return i18n.getCurrentLang();
}

async function getAllUsers() {
  const ret = await users.getUsers();
  return ret;
}

function getUserData(userGuid) {
  const ret = users.getUserData(userGuid);
  return ret;
}


async function getLink(userGuid, name) {
  const link = await users.getLink(userGuid, name);
  return link;
}

async function signUp(server, userId, password, options = {}) {
  const user = await users.signUp(server, userId, password, options);
  return user;
}

async function onlineLogin(server, userId, password, options = {}){
  const user = await users.onlineLogin(server, userId, password, options);
  return user;
}

async function localLogin() {
  const user = await users.localLogin();
  return user;
}

async function logout(userGuid) {
  await users.logout(userGuid);
}

async function queryNotes(userGuid, kbGuid, start, count, options = {}) {
  const notes = await users.queryNotes(userGuid, kbGuid, start, count, options);
  return notes;
}

async function getAllTitles (userGuid, kbGuid) {
  return await users.getAllTitles(userGuid, kbGuid);
}

async function getNote(userGuid, kbGuid, noteGuid, options) {
  const result = await users.getNote(userGuid, kbGuid, noteGuid, options);
  return result;
}

async function getNoteMarkdown(userGuid, kbGuid, noteGuid) {
  const result = await users.getNoteMarkdown(userGuid, kbGuid, noteGuid);
  return result;
}

async function setNoteMarkdown(userGuid, kbGuid, noteGuid, markdown) {
  const result = await users.setNoteMarkdown(userGuid, kbGuid, noteGuid, markdown);
  return result;
}

async function createNote(userGuid, kbGuid, note) {
  const result = await users.createNote(userGuid, kbGuid, note);
  return result;
}

async function deleteNote(userGuid, kbGuid, noteGuid) {
  const result = await users.deleteNote(userGuid, kbGuid, noteGuid);
  return result;
}

async function putBackNote(userGuid, kbGuid, noteGuid) {
  const result = await users.putBackNote(userGuid, kbGuid, noteGuid);
  return result;
}

async function syncKb(userGuid, kbGuid, options) {
  const result = await users.syncKb(userGuid, kbGuid, options);
  return result;
}

async function addImageFromData(userGuid, kbGuid, noteGuid, data, options) {
  const result = await users.addImageFromData(userGuid, kbGuid, noteGuid, data, options);
  return result;
}


async function addImageFromUrl(userGuid, kbGuid, noteGuid, url, options) {
  const result = await users.addImageFromUrl(userGuid, kbGuid, noteGuid, url, options);
  return result;
}

function getSettings( key, defaultValue) {
  return globalSettings.getSettings(key, defaultValue);
}

function setSettings( key, value) {
  globalSettings.setSettings(key, value);
}

function getUserSettings( userGuid, key, defaultValue) {
  return users.getSettings(userGuid, key, defaultValue);
}

function setUserSettings( userGuid, key, value) {
  users.setSettings(userGuid, key, value);
}

async function getAllTags(userGuid, kbGuid) {
  const result = await users.getAllTags(userGuid, kbGuid);
  return result;
}

async function getAllLinks(userGuid, kbGuid) {
  const result = await users.getAllLinks(userGuid, kbGuid);
  return result;
}

async function renameTag(userGuid, kbGuid, from, to) {
  const result = await users.renameTag(userGuid, kbGuid, from, to);
  return result;
}

async function setNoteStarred(userGuid, kbGuid, noteGuid, starred) {
  const result = await users.setNoteStarred(userGuid, kbGuid, noteGuid, starred);
  return result;
}

async function hasNotesInTrash(userGuid, kbGuid) {
  const result = await users.hasNotesInTrash(userGuid, kbGuid);
  return result;
}

async function getUserInfo(userGuid) {
  const user = users.getUserInfo(userGuid);
  return user;
}


async function refreshUserInfo(userGuid) {
  const user = await users.refreshUserInfo(userGuid);
  return user;
}

function registerListener(userGuid, listener) {
  users.registerListener(userGuid, listener);
}

function unregisterListener(listener) {
  users.unregisterListener(listener);
}

async function downloadNoteResource(userGuid, kbGuid, noteGuid, resName) {
  await users.downloadNoteResource(userGuid, kbGuid, noteGuid, resName);
}

function emitEvent(userGuid, eventName, ...args) {
  users.emitEvent(userGuid, eventName, ...args);
}

const wizApi = {
  i18nInit,
  getCurrentLang,
  registerListener,
  unregisterListener,
  getAllUsers,
  getUserData,
  getUserInfo,
  signUp,
  onlineLogin,
  localLogin,
  logout,
  queryNotes,
  getLink,
  getNote,
  getNoteMarkdown,
  setNoteMarkdown,
  createNote,
  deleteNote,
  putBackNote,
  syncKb,
  addImageFromData,
  addImageFromUrl,
  getSettings,
  setSettings,
  getUserSettings,
  setUserSettings,
  getAllTags,
  getAllTags,
  setNoteStarred,
  hasNotesInTrash,
  getUserSettings,
  refreshUserInfo,
  downloadNoteResource,
  emitEvent,
  getAllTitles,
  core: {
    paths: require('./common/paths'),
    utils: require('./utils'),
    request: require('./common/request'),
    lockers: require('./common/lockers'),
    i18next,
  }
}

module.exports = wizApi;
