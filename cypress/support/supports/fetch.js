/**
 * Cypress does not stub "fetch" yet, only XHR.
 * Therefore, we need to remove window.fetch from every page load
 * so GraphQL client is forced to polyfill it with XHR.
 */
Cypress.on('window:before:load', win => {
  delete win.fetch
});
