// Copyright 2010 Google Inc. All Rights Reserved.

/**
 * @fileoverview Isolates access to the localStorage so we can test locally.
 *
 * New webkit change throws DOM Exception 18 if one tries to access localStorage
 * from a test (using file:// scheme).
 *
 * @author cira@google.com (Nebojsa Ciric)
 */

/**
 * Stores a key/value pair into localStorage.
 *
 * @param {string} key Storage key.
 * @param {string} value Value associated with the key.
 */
function setLocalStorageItem(key, value) {
  if (localStorage)
    localStorage[key] = value;
}

/**
 * Gets a value for a given key from localStorage, or null.
 *
 * @param {string} key Storage key.
 * @return {string} value Value associated with the key.
 */
function getLocalStorageItem(key) {
  if (localStorage)
    return localStorage.getItem(key);

  return ;
}

/**
 * Removes key/value pair from localStorage.
 *
 * @param {string} key Storage key.
 */
function removeLocalStorageItem(key) {
  if (localStorage)
    localStorage.removeItem(key);
}
