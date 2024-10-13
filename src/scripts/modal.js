export const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
};

export const closeModal = (popup) => {
  document.removeEventListener("keydown", closeByEsc);
  popup.classList.remove("popup_is-opened");
};

export const closeModalByOverlay = (e) => {
  closeModal(e.target);
};

export const openImageModal = (src, caption, imagePopup) => {
  imagePopup.querySelector(".popup__image").src = src;
  imagePopup.querySelector(".popup__caption").textContent = caption;
  openModal(imagePopup);
};

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}
