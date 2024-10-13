import { User } from ".";
import { setLike, removeLike, removeCard } from "./api";
import { openImageModal } from "./modal";

export const createCard = (cardData, cardSettings) => {
	const imagePopup = document.querySelector(cardSettings.imagePopup);
	const cardTemplate = document.querySelector(cardSettings.cardTemplate).content.querySelector(cardSettings.card);
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(cardSettings.cardImage);
  const numLikes = cardElement.querySelector(cardSettings.cardLikes);
  const likeButton = cardElement.querySelector(cardSettings.cardLikeButton);
  const deleteButton = cardElement.querySelector(cardSettings.cardDeleteButton);
  cardElement.querySelector(cardSettings.cardTitle).textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  numLikes.textContent = cardData.likes.length;

  if (cardData.owner._id != User._id) {
    deleteButton.style.display = "none";
  }

  let isLiked = false;
  if (cardData.likes.some((user) => user._id === User._id)) {
    isLiked = true;
    likeButton.classList.add(cardSettings.cardLikeButtonActive);
  }

  likeButton.addEventListener("click", (e) => {
    if (!isLiked) {
      e.target.classList.add(cardSettings.cardLikeButtonActive);

      setLike(cardData._id)
        .then((card) => {
          numLikes.textContent = card.likes.length;
        })
        .catch((err) => {
          console.error("Error: " + err);
        });
    } else {
      e.target.classList.remove(cardSettings.cardLikeButtonActive);
      removeLike(cardData._id)
        .then((card) => {
          numLikes.textContent = card.likes.length;
        })
        .catch((err) => {
          console.error("Error: " + err);
        });
    }
    isLiked = !isLiked;
  });

  deleteButton.addEventListener("click", (e) => {
    removeCard(cardData._id).then(() => {
      e.target.closest(".card").remove();
    })
    .catch((err) => {
      console.error("Error: " + err);
    });
  });

  cardImage.addEventListener("click", (e) => {
    openImageModal(
      cardImage.src,
      cardElement.querySelector(cardSettings.cardTitle).textContent,
			imagePopup
    );
  });

  return cardElement;
};


export const renderCards = (cards, placesList, cardSettings) => {
	cards.forEach((card) => {
		placesList.append(createCard(card, cardSettings));
	});
}