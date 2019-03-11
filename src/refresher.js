import jwtDecode from 'jwt-decode';
import config from './config';

const safeJwtDecode = function (jwt) {

  let result;

  try {
    result = jwtDecode(jwt);
  } catch (err) {
    // Do nothing
  }

  return result;
};

const createRefresher = function (storage, key) {

  let timeout;

  const refresh = function (token) {

    fetch(`${config.API_ROOT}/refresh`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {

      if (!res.ok) {
        return Promise.reject(res);
      }

      return res.json();
    })
    .then((data) => {
      storage.setItem(key, data[key]);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(poll);
  };

  const poll = function () {

    const token = storage.getItem(key);

    if (!token) {
      timeout = setTimeout(poll, 60 * 1000);
      return;
    }

    const payload = safeJwtDecode(token);

    if (!payload.exp) {
      timeout = setTimeout(poll, 60 * 1000);
      return;
    }

    const expirationTime = (payload.exp * 1000) - Date.now();
    const refreshTime    = expirationTime - (10 * 1000);

    timeout = setTimeout(refresh, refreshTime, token);
  };

  const start = function () {
    poll();
  };

  const stop = function () {
    clearTimeout(timeout);
  };

  return {
    start,
    stop,
  }
};

export default {
  createRefresher,
};
