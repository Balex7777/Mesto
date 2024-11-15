import "../pages/index.css";
import { enableValidation } from "./validation";
import { openModal, closeModal, closeModalByOverlay } from "./modal";
import { addNewCard, editProfile, loadUserFromServer, loadCardsFromServer, setAvatar } from "./api";
import { renderCards, createCard } from "./cards";

const placesList = document.querySelector(".places__list");

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const authorizationPopup = document.querySelector(".popup_type_authorization");

const inputName = profilePopup.querySelector(".popup__input_type_name");
const inputDescription = profilePopup.querySelector(".popup__input_type_description");
const inputCardName = cardPopup.querySelector(".popup__input_type_card-name");
const inputUrl = cardPopup.querySelector(".popup__input_type_url");
const inputUrlAvatar = avatarPopup.querySelector(".popup__input_type_url");
const inputToken = authorizationPopup.querySelector(".popup__input_type_token");
const inputGruop = authorizationPopup.querySelector(".popup__input_type_group");

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardSettings = {
  cardImage: ".card__image",
  cardTitle: ".card__title",
  cardLikeButton: ".card__like-button",
  cardLikeButtonActive: "card__like-button_is-active",
  cardDeleteButton: ".card__delete-button",
  cardLikes: ".card__likes-num",
  card: ".card",
	imagePopup: ".popup_type_image",
	cardTemplate: "#card-template"
};

export const User = {
  name: "",
  about: "",
  avatar: "",
  _id: "",
  cohort: "",
};

export let token;
export let group;

const profileTitle = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")
const profileImage = document.querySelector(".profile__image")
const udpateProfile = () => {
	profileTitle.textContent = User.name;
  profileDescription.textContent = User.about;
  profileImage.style.backgroundImage = `url("${User.avatar}")`;
}

const updateUserData = (userData) => {
  User.name = userData.name;
  User.about = userData.about;
  User.avatar = userData.avatar;
  User._id = userData._id;
  User.cohort = userData.cohort;
	udpateProfile()
};

const setLoadingButton = (
  button,
  isLoading,
  loadingText = "Сохранение...",
  defaultText = "Сохранить"
) => {
  button.textContent = isLoading ? loadingText : defaultText;
};

const setCloseEvent = () => {
	const closeButtons = document.querySelectorAll(".popup__close");
	closeButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const popup = button.closest(".popup");
			closeModal(popup);
		});
	});
}

const setAnimationOnPopup = () => {
	const popups = [imagePopup, profilePopup, cardPopup, avatarPopup];
	popups.forEach((popup) => {
		popup.classList.add("popup_is-animated");
		popup.addEventListener("click", closeModalByOverlay);
	});
}

const openProfilePopup = () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openModal(profilePopup);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const submitButton = profilePopup.querySelector(".button");
  setLoadingButton(submitButton, true);
  editProfile(inputName.value, inputDescription.value)
    .then((user) => {
      updateUserData(user)
      udpateProfile()
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.error("Error: " + err);
    })
    .finally(() => {
      setLoadingButton(submitButton, false);
    });
};

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  const submitButton = cardPopup.querySelector(".button");
  setLoadingButton(submitButton, true);
  addNewCard(
    inputCardName.value,
    inputUrl.value,
  )
    .then((card) => {
      placesList.prepend(createCard(card, cardSettings));
      closeModal(cardPopup);
			evt.target.reset();
    })
    .catch((err) => {
      console.error("Error: " + err);
    })
    .finally(() => {
      setLoadingButton(submitButton, false);
    });
};

const handleEditAvatarSubmit = (evt) => {
	evt.preventDefault();
  const submitButton = avatarPopup.querySelector(".button");
  setLoadingButton(submitButton, true);
  setAvatar(inputUrlAvatar.value)
    .then((user) => {
			updateUserData(user)
      closeModal(avatarPopup);
			evt.target.reset();
    })
    .catch((err) => {
      console.error("Error: " + err);
    })
    .finally(() => {
      setLoadingButton(submitButton, false);
    });
};

const handleAuthorization = (evt) => {
	evt.preventDefault()
  const submitButton = authorizationPopup.querySelector(".button");
  setLoadingButton(submitButton, true);
	token = inputToken.value
	group = inputGruop.value
	Promise.all([loadCardsFromServer(), loadUserFromServer()])
		.then(([cards, userData]) => {
			updateUserData(userData);
			renderCards(cards, placesList, cardSettings);
		})
		.catch((err) => {
			console.error("Error: " + err);
			alert("Error: " + err)
		})
		.finally(() => {
			closeModal(authorizationPopup)
			setLoadingButton(submitButton, false)
		})
}

enableValidation(validationSettings);

setCloseEvent();

setAnimationOnPopup();

const profilePopupButton = document.querySelector(".profile__edit-button");
profilePopupButton.addEventListener("click", openProfilePopup);

const cardPopupButton = document.querySelector(".profile__add-button");
cardPopupButton.addEventListener("click", () => openModal(cardPopup));

const avatarPopupButton = document.querySelector(".profile__image");
avatarPopupButton.addEventListener("click", () => openModal(avatarPopup));

document.forms.editProfile.addEventListener("submit", handleProfileFormSubmit);
document.forms.newPlace.addEventListener("submit", handleNewCardFormSubmit);
document.forms.editAvatar.addEventListener("submit", handleEditAvatarSubmit);
document.forms.authorization.addEventListener("submit", handleAuthorization);
