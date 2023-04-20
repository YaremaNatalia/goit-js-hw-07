import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const imagesContainer = document.querySelector(".gallery");

const imagesMarkup = createPhotosMarkup(galleryItems);
imagesContainer.insertAdjacentHTML("beforeend", imagesMarkup);

function createPhotosMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `;
    })
    .join("");
}

imagesContainer.addEventListener("click", (evt) => {
  evt.preventDefault();
  const isImageEl = evt.target.classList.contains("gallery__image");
  if (!isImageEl) {
    return;
  }
  const imgOriginal = evt.target.getAttribute("data-source");
  const instance = basicLightbox.create(`
    <img src="${imgOriginal}" width="800" height="600">
`);
  instance.show();

    document.addEventListener("keydown", (evt) => onEscPress(evt, instance));
});

const onEscPress = (evt, instance) => {
  const ESC_KEYCODE = "Escape";
  if (evt.code === ESC_KEYCODE) {
    instance.close();

    document.removeEventListener("keydown", (evt) => onEscPress(evt, instance));
  }
};
