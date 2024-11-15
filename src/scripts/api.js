import { token, group } from ".";


const getConfig = () => ({
  baseUrl: `https://nomoreparties.co/v1/${group}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

const getResponseData = (res) => {
	return (res.status === 200) ? res.json() : Promise.reject(res.status);
}

export const loadCardsFromServer = () => {
	const config = getConfig()
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const loadUserFromServer = () => {
	const config = getConfig()
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const addNewCard = (name, link) => {
	const config = getConfig()
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
	const config = getConfig()
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
	const config = getConfig()
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const removeLike = (cardId, numLikes) => {
	const config = getConfig()
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const removeCard = (cardId, cardElement) => {
	const config = getConfig()
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData);
};

export const setAvatar = (url, popup) => {
	const config = getConfig()
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  })
    .then(getResponseData);
};
