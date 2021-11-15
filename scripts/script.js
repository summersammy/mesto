// Profile
const editProfileForm = document.querySelector('[name=edit_profile_form]');
const currentProfileNameElement = document.querySelector('.profile__info-title');
const currentProfessionElement = document.querySelector('.profile__info-subtitle');
const openEditPopupButton = document.querySelector('.profile__edit-button');

// Card
const openAddPopupButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.elements__list');

// Edit profile popup
const popupEditProfile = document.querySelector('#edit_profile_popup');
const editProfilePopupContainer = popupEditProfile.querySelector('.popup__container');
const editProfilePopupCloseButton = popupEditProfile.querySelector('.popup__close');

const editProfileName = popupEditProfile.querySelector('#input-name');
const editProfileProfession = popupEditProfile.querySelector('#input-profession');


editProfileForm.addEventListener('submit', function editProfile(evt) {
    evt.preventDefault();
    currentProfileNameElement.textContent = editProfileName.value;
    currentProfessionElement.textContent = editProfileProfession.value;
    closePopup(popupEditProfile);
});

function openEditPopup() {
    editProfileName.value = currentProfileNameElement.textContent;
    editProfileProfession.value = currentProfessionElement.textContent;
    popupEditProfile.classList.add('popup_opened');
};

// Add card form
const addPlacePopup = document.querySelector('#add_place_popup')
const addPlaceForm = addPlacePopup.querySelector('form');
const placeName = document.querySelector('#input-place-name');
const placeImageUrl = document.querySelector('#input-place-image-url');
const popupAddCard = document.querySelector('#add_place_popup');
const addPlacePopupCloseButton = addPlacePopup.querySelector('.popup__close');

addPlaceForm.addEventListener('submit', function addPlace(evt) {
    evt.preventDefault();
    const card = createCard(placeName.value, placeImageUrl.value);
    addCard(card);
    closePopup(addPlacePopup);
    placeName.value = '';
    placeImageUrl.value = '';
})

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

// Image view popup
const imageViewPopup = document.querySelector('#image_view_popup');
const imageViewPopupCloseButton = imageViewPopup.querySelector('.popup__close');

function openImagePopup(event) {
    const image = imageViewPopup.querySelector('img');
    const caption = imageViewPopup.querySelector('p');

    image.src = event.target.src;
    caption.textContent = event.target
        .closest('.elements__list-item')
        .querySelector('.elements__text')
        .textContent;
    imageViewPopup.classList.add('popup_opened');
}



function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
}

initialCards.forEach(function (item) {
    const card = createCard(item.name, item.link);
    addCard(card);
});

function openAddPopup() {
    addPlacePopup.classList.add('popup_opened');
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