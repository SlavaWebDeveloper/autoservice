const BASE__URL = 'https://noble-deciduous-booth.glitch.me/';

const handleRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export function fetchData() {
  return fetch(`${BASE__URL}/api`)
    .then(handleRequest)
}

export function postData(data) {
  return fetch(`${BASE__URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleRequest)
}

