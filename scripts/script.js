import { initialCards } from './cards.js'

// Profile
const popupEditProfile = document.querySelector('#edit_profile_popup');
const editProfileForm = popupEditProfile.querySelector('form');
const currentProfileNameElement = document.querySelector('.profile__info-title');
const currentProfessionElement = document.querySelector('.profile__info-subtitle');
const openEditPopupButton = document.querySelector('.profile__edit-button');

// Card
const openAddPopupButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.elements__list');

// Edit profile popup
const editProfilePopupCloseButton = popupEditProfile.querySelector('.popup__close');
const editProfileName = popupEditProfile.querySelector('#input-name');
const editProfileProfession = popupEditProfile.querySelector('#input-profession');

// Add card form
const addPlacePopup = document.querySelector('#add_place_popup')
const addPlaceForm = addPlacePopup.querySelector('form');
const placeName = document.querySelector('#input-place-name');
const placeImageUrl = document.querySelector('#input-place-image-url');
const addPlacePopupCloseButton = addPlacePopup.querySelector('.popup__close');

// Image view popup
const imageViewPopup = document.querySelector('#image_view_popup');
const imageViewPopupCloseButton = imageViewPopup.querySelector('.popup__close');

function closePopup(popup) {
    popup.classList.remove('popup_opened', 'popup__image-overlay');
    // popup.removeEventListner('click',);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

const popupsElements = document.querySelectorAll('.popup');
const popupsList = Array.from(popupsElements);
popupsList.forEach((popup) => {
    popup.addEventListener('click', (event) => {
        const popupContainer = popup.querySelector('.popup__container');
        if (!popupContainer.contains(event.target)) closePopup(popup);
    })
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') closePopup(popup);
    })
})

//Functions

editProfileForm.addEventListener('submit', function editProfile(evt) {
    evt.preventDefault();
    currentProfileNameElement.textContent = editProfileName.value;
    currentProfessionElement.textContent = editProfileProfession.value;
    closePopup(popupEditProfile);
});

function openEditPopup() {
    editProfileName.value = currentProfileNameElement.textContent;
    editProfileProfession.value = currentProfessionElement.textContent;
    openPopup(popupEditProfile)
};

function addPlace(evt) {
    evt.preventDefault();
    const card = createCard(placeName.value, placeImageUrl.value);
    addCard(card);
    closePopup(addPlacePopup);
    placeName.value = '';
    placeImageUrl.value = '';
}

addPlaceForm.addEventListener('submit', addPlace)

function createCard(name, imageLink) {
    const cardElement = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
    const image = cardElement.querySelector('.elements__item');

    image.src = imageLink;
    image.alt = name;
    cardElement.querySelector('.elements__text').textContent = name;

    const heart = cardElement.querySelector('.elements__heart');
    heart.addEventListener('click', function (event) {
        event.target.classList.toggle('elements__heart-black');
    })

    image.addEventListener('click', openImagePopup)
    const trash = cardElement.querySelector('.elements__trash');
    trash.addEventListener('click', function (event) {
        event.target.closest('.elements__list-item').remove();
    })

    return cardElement;
}

function addCard(card) {
    cardList.prepend(card);
}

function openImagePopup(event) {
    const image = imageViewPopup.querySelector('.popup__image');
    const caption = imageViewPopup.querySelector('.popup__image-caption');

    image.src = event.target.src;
    image.alt = event.target.alt;
    caption.textContent = event.target
        .closest('.elements__list-item')
        .querySelector('.elements__text')
        .textContent;
    openPopup(imageViewPopup);
    imageViewPopup.classList.add('popup__image-overlay');
}

initialCards.forEach(function (item) {
    const card = createCard(item.name, item.link);
    addCard(card);
});

function openAddPopup() {
    openPopup(addPlacePopup);
}

openEditPopupButton.addEventListener('click', openEditPopup);
openAddPopupButton.addEventListener('click', openAddPopup);



imageViewPopupCloseButton.addEventListener('click', function () {
    closePopup(imageViewPopup);
});
addPlacePopupCloseButton.addEventListener('click', function () {
    closePopup(addPlacePopup);
    placeName.value = '';
    placeImageUrl.value = '';
});
editProfilePopupCloseButton.addEventListener('click', function () {
    closePopup(popupEditProfile);
});