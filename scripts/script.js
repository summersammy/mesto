const pageElement = document.querySelector('.page');
const currentNameElement = pageElement.querySelector('.profile__name');
const currentProfessionElement = pageElement.querySelector('.profile__profession');
const openPopupButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closePopupButton = popupElement.querySelector('.popup__close');
const form = popupElement.querySelector('form');
const nameElement = popupElement.querySelector('#input-name');
const professionElement = popupElement.querySelector('#input-profession');
const hearts = document.querySelectorAll('.elements__heart');

for (let i = 0; i < hearts.length; i++) {
    const currentHeart = hearts[i];
    currentHeart.addEventListener('click', function (event) {
        event.target.classList.toggle('elements__heart-black');
    })
};


function closePopup() {
    popupElement.classList.remove('popup__opened');
}

function openPopup() {
    nameElement.value = currentNameElement.textContent;
    professionElement.value = currentProfessionElement.textContent;
    popupElement.classList.add('popup__opened');
};

form.addEventListener('submit', function editProfile(evt) {
    evt.preventDefault();
    currentNameElement.textContent = nameElement.value;
    currentProfessionElement.textContent = professionElement.value;
    closePopup();
});

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);


