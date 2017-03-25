import idb from 'idb-keyval';

export function get(key) {
  return idb.get(key);
}

export function set(key, value) {
  return idb.set(key, value);
}

export function remove(key) {
  return idb.delete(key);
}