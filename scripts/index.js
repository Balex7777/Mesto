const profilePopup = document.querySelector(".popup_type_edit")
const cardPopup = document.querySelector(".popup_type_new-card")
const imagePopup = document.querySelector(".popup_type_image")

const listPopups = [imagePopup, profilePopup, cardPopup]

const profilePopupButton = document.querySelector(".profile__edit-button")
const cardPopupButton = document.querySelector(".profile__add-button")

const listCloseButtons = document.querySelectorAll(".popup__close")

console.log(listCloseButtons)

// @todo: Темплейт карточки
function createCard(name, link){
	const cardTemplate = document.querySelector("#card-template").content
	const cardElement = cardTemplate.querySelector(".card").cloneNode(true)

	cardElement.querySelector('.card__title').textContent = name
	cardElement.querySelector('.card__image').src = link

	return cardElement
}

function renderCards(){
	const placesList = document.querySelector(".places__list")

	initialCards.forEach(element => {
		placesList.append(createCard(element.name, element.link))
	})
}

renderCards();

function openModal(popup) {      
	popup.classList.add('popup_is-opened');
}

function closeModal(popup) {      
	popup.classList.remove('popup_is-opened');
}

function openEditPopup(){
	const inputName = profilePopup.querySelector(".popup__input_type_name")
	const inputDescription = profilePopup.querySelector(".popup__input_type_description")

	inputName.value = document.querySelector(".profile__title").textContent
	inputDescription.value = document.querySelector(".profile__description").textContent
	
	openModal(profilePopup)
}

profilePopupButton.addEventListener("click", openEditPopup)

cardPopupButton.addEventListener("click", function(e){
	openModal(cardPopup)
})

listCloseButtons.forEach((item, index) => {
	item.addEventListener("click", function(e){
		closeModal(listPopups[index])
	})
})

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
