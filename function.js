const API_URL = "https://thesimpsonsquoteapi.glitch.me/quotes";
const mainContainer = document.getElementById("main-container");
const cardContainer = document.getElementById("card-row");
const formButton = document.getElementById("form-button");
const divTemplate = document.querySelector("#card-template");

const searchNameButton = document.getElementById("search-name");
const searchAllButton = document.getElementById("search-name-quantity");

//console.log(container)

window.addEventListener("load", async (e) => {
    const cardData = await getData().then((result) => result);

    cardData.forEach((element) => {
        createCard(element);
    });
});

searchNameButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const nameField = document.getElementById("just-name");

    const data = await getDataByName(nameField.value);

    removeAllChildNodes(cardContainer);

    data.forEach((element) => {
        createCard(element);
    });

    nameField.value = "";
});

searchAllButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const nameField = document.getElementById("name");
    console.log(nameField.value);
    const quantityField = document.getElementById("quantity");

    const data = await getDataByNameAndQuantity(
        nameField.value,
        quantityField.value
    );

    removeAllChildNodes(cardContainer);

    data.forEach((element) => {
        createCard(element);
    });

    nameField.value = "";
    quantityField.value = "";
});

async function getData() {
    const response = await fetch(
        API_URL +
            "?" +
            new URLSearchParams({
                count: "12",
            })
    );

    const data = await response.json();

    return data;
}

async function getDataByName(name) {
    const response = await fetch(
        API_URL +
            "?" +
            new URLSearchParams({
                character: name,
            })
    );

    const data = await response.json();

    return data;
}

async function getDataByNameAndQuantity(name, quantity) {
    const response = await fetch(
        API_URL +
            "?" +
            new URLSearchParams({
                character: name,
                count: quantity,
            })
    );

    const data = await response.json();

    return data;
}

function createCard(element) {
    const card = divTemplate.content.cloneNode(true);
    const cardImg = card.querySelector("img");
    const cardTitle = card.querySelector(".card-title");
    const cardText = card.querySelector(".card-text");

    cardImg.src = element.image;
    cardTitle.textContent = element.character;
    cardText.textContent = element.quote;

    cardContainer.appendChild(card);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
