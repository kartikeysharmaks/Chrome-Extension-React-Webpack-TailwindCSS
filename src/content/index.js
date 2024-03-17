import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../react/components/Modal.jsx';

const addMagicImage = () => {
  const container = document.querySelector(".msg-form__msg-content-container");
  if (container) {
    const magicImage = document.createElement("img");
    magicImage.src = "https://icon-library.com/images/magic-icon-png/magic-icon-png-12.jpg"
    magicImage.alt = "magic-icon"
    magicImage.style.width = "18px";
    magicImage.style.height = "18px";
    magicImage.style.position = "absolute";
    magicImage.style.bottom = "15px";
    magicImage.style.right = "50px";
    magicImage.style.marginBottom = "2px";
    magicImage.style.marginRight = "2px";
    magicImage.style.borderRadius = "40px";
    magicImage.style.padding ="4px";
    magicImage.style.backgroundColor = "white";
    magicImage.style.cursor = "pointer";
    container.appendChild(magicImage);
    magicImage.addEventListener("click", createModal);
  }
};

const removeMagicImage = () => {
  const magicImage = document.querySelector(
    ".msg-form__msg-content-container img"
  );

  if (magicImage) {
    magicImage.remove();
  }
};

document.addEventListener("focusin", addMagicImage);
document.addEventListener("focusout", removeMagicImage);

// Function to render the modal
function createModal() {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modal-root';
  document.body.appendChild(modalContainer);
  ReactDOM.render(<Modal onClose={() => modalContainer.remove()} />, modalContainer);
}
