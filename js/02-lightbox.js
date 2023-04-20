import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const imagesContainer = document.querySelector(".gallery"); // отримуємо посилання на галерею

const imagesMarkup = createPhotosMarkup(galleryItems); // записуємо в константу виклик функції створення розмітки з вкладенням масиву картинок
imagesContainer.insertAdjacentHTML("beforeend", imagesMarkup); // додаємо розмітку в контейнер HTML

function createPhotosMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}" />
  </a>
</li>
    `;
    })
    .join("");
}

let lightbox = new SimpleLightbox(".gallery__link", {
  captionsData: "alt",
  captionDelay: 250,
});
