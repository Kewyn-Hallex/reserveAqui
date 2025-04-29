let adultCount = 2;
let childCount = 0;
let roomCount = 1;

const adultCountElement = document.getElementById('adult-count');
const childCountElement = document.getElementById('child-count');
const roomCountElement = document.getElementById('room-count');
const guestInfoElement = document.getElementById('guest-info');
const guestButton = document.getElementById('guest-button');
const guestCard = document.getElementById('guest-card');
const guestSelection = document.querySelector('.guest-selection');
const applyButton = document.getElementById('apply-button');

function updateGuestInfo() {
    guestInfoElement.textContent = `${adultCount} adulto${adultCount > 1 ? 's' : ''} · ${childCount} criança${childCount !== 1 ? 's' : ''} · ${roomCount} quarto${roomCount > 1 ? 's' : ''}`;
}

function increaseAdults() {
    adultCount++;
    adultCountElement.textContent = adultCount;
    updateGuestInfo();
}

function decreaseAdults() {
    if (adultCount > 1) {
        adultCount--;
        adultCountElement.textContent = adultCount;
        updateGuestInfo();
    }
}

function increaseChildren() {
    childCount++;
    childCountElement.textContent = childCount;
    updateGuestInfo();
}

function decreaseChildren() {
    if (childCount > 0) {
        childCount--;
        childCountElement.textContent = childCount;
        updateGuestInfo();
    }
}

function increaseRooms() {
    roomCount++;
    roomCountElement.textContent = roomCount;
    updateGuestInfo();
}

function decreaseRooms() {
    if (roomCount > 1) {
        roomCount--;
        roomCountElement.textContent = roomCount;
        updateGuestInfo();
    }
}

document.getElementById('adult-increase').addEventListener('click', increaseAdults);
document.getElementById('adult-decrease').addEventListener('click', decreaseAdults);
document.getElementById('child-increase').addEventListener('click', increaseChildren);
document.getElementById('child-decrease').addEventListener('click', decreaseChildren);
document.getElementById('room-increase').addEventListener('click', increaseRooms);
document.getElementById('room-decrease').addEventListener('click', decreaseRooms);

guestButton.addEventListener('click', (e) => {
    e.stopPropagation();
    guestCard.style.display = guestCard.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    if (!guestCard.contains(e.target) && !guestButton.contains(e.target)) {
        guestCard.style.display = 'none';
    }
});