const pageElement = document.querySelector('.page');

// Profile
const currentProfileNameElement = pageElement.querySelector('.profile__info-title');
const currentProfessionElement = pageElement.querySelector('.profile__info-subtitle');
const openEditPopupButton = document.querySelector('.profile__edit-button');

// Popup

const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupContent = popup.querySelector('.popup__content');
const closePopupButton = popup.querySelector('.popup__close');

// Card
const openAddPopupButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.elements__list');

// Templates
const editTemplate = document.querySelector('#edit_name_template').content;
const addPlaceTemplate = document.querySelector('#add_place_template').content;
const imageViewTemplate = document.querySelector('#image_view_template').content;

const initialCards = [
    {
        name: 'Алтай',
        link: 'https://images.unsplash.com/photo-1593948360735-4ddb6f0dde7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://images.unsplash.com/photo-1501675423372-9bfa95849e62?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80'
    },
    {
        name: 'Эльбрус',
        link: 'https://images.unsplash.com/photo-1626518139514-65676cf25bac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
        name: 'Камчатка',
        link: 'https://images.unsplash.com/photo-1537690381844-9da2b0b69640?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2129&q=80'
    },
    {
        name: 'Карачаево-Черкесия',
        link: 'https://images.unsplash.com/photo-1588584922681-745a2223f72c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80'
    },
    {
        name: 'Териберка',
        link: 'https://images.unsplash.com/photo-1612860640446-3023ebe28e85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2831&q=80'
    }
];

function closePopup() {
    setTimeout(function () {
        popupContainer.classList.remove('popup__container-form');
        popupContent.innerHTML = '';
    }, 400);
    popup.classList.remove('popup_opened', 'popup__image-overlay');
}

function openEditPopup() {
    const editProfileForm = editTemplate.querySelector('form').cloneNode(true);
    popupContainer.classList.add('popup__container-form');
    popupContent.append(editProfileForm);

    const nameElement = editProfileForm.querySelector('#input-name');
    const professionElement = editProfileForm.querySelector('#input-profession');

    nameElement.value = currentProfileNameElement.textContent;
    professionElement.value = currentProfessionElement.textContent;

    editProfileForm.addEventListener('submit', function editProfile(evt) {
        evt.preventDefault();
        currentProfileNameElement.textContent = nameElement.value;
        currentProfessionElement.textContent = professionElement.value;
        closePopup();
    });
    popup.classList.add('popup_opened');
};


function openImagePopup(event) {
    const imagePopupContent = imageViewTemplate.cloneNode(true);
    const image = imagePopupContent.querySelector('img');
    const caption = imagePopupContent.querySelector('p');

    image.src = event.target.src;
    caption.textContent = event.target
        .closest('.elements__list-item')
        .querySelector('.elements__text')
        .textContent;
    popupContent.append(imagePopupContent);
    popup.classList.add('popup_opened', 'popup__image-overlay');
}



function addCard(name, imageLink) {
    const cardElement = cardTemplate.querySelector('.elements__list-item').cloneNode(true);
    const image = cardElement.querySelector('.elements__item');

    image.src = imageLink;
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

    cardList.prepend(cardElement);
}



initialCards.forEach(function (item) {
    addCard(item.name, item.link);
});

function openAddPopup() {
    const addPlaceForm = addPlaceTemplate.querySelector('form').cloneNode(true);
    popupContainer.classList.add('popup__container-form');

    const placeName = addPlaceForm.querySelector('#input-place-name');
    const placeImageUrl = addPlaceForm.querySelector('#input-place-image-url');

    popupContent.append(addPlaceForm);

    addPlaceForm.addEventListener('submit', function addPlace(evt) {
        evt.preventDefault();
        addCard(placeName.value, placeImageUrl.value);
        closePopup();
    })
    popup.classList.add('popup_opened');
}

openEditPopupButton.addEventListener('click', openEditPopup);
openAddPopupButton.addEventListener('click', openAddPopup);
closePopupButton.addEventListener('click', closePopup);