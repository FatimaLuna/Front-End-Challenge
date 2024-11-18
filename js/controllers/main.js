import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard({ name, price, image, id }) {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="imagen producto"/>
        </div>
        <div class="card-container--info">
            <p>${name}</p>
            <div class="card-container--value">
                <p>${price}</p>
                <button class="delete-button" data-id="${id}">Eliminar</button>
            </div>
        </div>
    `;
    card.querySelector(".delete-button").addEventListener("click", async () => {
        await servicesProducts.deleteProduct(id);
        card.remove();
    });
    return card;
}

const renderProducts = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach((product) => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error(error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    try {
        const newProduct = await servicesProducts.createProduct(name, price, image);
        const newCard = createCard(newProduct);
        productContainer.appendChild(newCard);
    } catch (error) {
        console.error(error);
    }
    form.reset();
});

renderProducts();
