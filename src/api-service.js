
const API_ROOT = 'http://localhost:8000';


const login = function (username, password) {

  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
};

const refresh = function (token) {

  return fetch(`${API_ROOT}/refresh`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
};

export default {
  login,
  refresh,
}
