const config = {
  baseUrl: "https://nomoreparties.co/v1/frontend-st-cohort-201",
  headers: {
    authorization: "2bb0b79e-776d-4c9d-bd4d-610499dc8342",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
	return (res.status === 200) ? res.json() : Promise.reject(res.status);
}

export const loadCardsFromServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const loadUserFromServer = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(getResponseData);
};

export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
    .then(getResponseData);
};

export const setLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const removeLike = (cardId, numLikes) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const removeCard = (cardId, cardElement) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const setAvatar = (url, popup) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  })
    .then(getResponseData);
};
