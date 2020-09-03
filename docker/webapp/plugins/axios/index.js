export let axios;

export default ({ $axios }) => {
  $axios.defaults.baseURL = 'http://localhost:3000/'
  $axios.onRequest(config => {
    config.headers.common['Authorization'] = `XXXXXX`;
    config.headers.common['Accept'] = 'application/json';
  });

  $axios.onResponse(response => {
    return Promise.resolve(response);
  })

  $axios.onError(error => {
    return Promise.reject(error.response);
  });

  axios = $axios;
}