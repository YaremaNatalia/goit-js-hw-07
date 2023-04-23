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
  evt.preventDefault(); // заборона автоматичного збереження фото на компьютер
  const isImageEl = evt.target.classList.contains("gallery__image"); // перевірка, щоб клік був саме на фото а не на проміжки між ними
  if (!isImageEl) {
    return;
  }
  const imgOriginal = evt.target.getAttribute("data-source"); //посилання на велике зображення
  //створення модального вікна через метод бібліотеки з виведенням фото великого розміру
  const instance = basicLightbox.create(`
    <img src="${imgOriginal}" width="800" height="600">
  `);

  instance.show(); //відкриття модалки методом бібліотеки

  const onEscPress = (evt) => {
    const ESC_KEYCODE = "Escape";
    if (evt.code === ESC_KEYCODE) {
      instance.close();
      document.removeEventListener("keydown", onEscPress); //функція яка закриває модалку клавішею "Escape" і знімає слухач клавіатури
    }
  };

  document.addEventListener("keydown", onEscPress); //додавання слухача клавіатури і виклик функції перевірки чи натиснута клавіша "Escape". Стоїть нижче бо функція обявлена через константу

  instance.on("close", () => {
    document.removeEventListener("keydown", onEscPress); //додавання слухача "закриття" на модальне вікно методом бібліотеки, якщо модалка закривається викликається зняття слухача клавіатури (при знятті вказуються ті ж самі параметри, що і при додаванні)
  });
});
