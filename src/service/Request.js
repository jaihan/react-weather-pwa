/**
 * GET request using native fetch
 * returns a promise.
*/
export function getRequest(url) {
  return fetch(url).then((d) => d.json());
}
