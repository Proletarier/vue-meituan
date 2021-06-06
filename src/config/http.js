import axios from 'axios';

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
