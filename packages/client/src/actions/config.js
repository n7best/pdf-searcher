const defaultEndpoint =
  window.location.protocol + '//' + window.location.hostname + ':8080';
export const api_endpoint =
  typeof API_BASE_URL === 'undefined' ? defaultEndpoint : API_BASE_URL;
