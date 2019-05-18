function callApi(url, method) {
  const options = {
    method
  };

  return fetch(url, options)
    .then(response => response.ok ? response.json() : Promise.reject(Error('Failed to load')))
    .catch(error => {
      console.warn(error);
      throw error;
    });
}

export { callApi };