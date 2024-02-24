const container = document.getElementById("searched-prod");

const backOffice = document.getElementById("backOffice");

let spinner = document.getElementById("spinner");

const homePage = document.querySelectorAll(".home");

let activeItem;

const addToCartBtn = document.getElementById("addToCart");
const cartBox = document.getElementById("cartBox");
const prodPage = document.getElementById("prodPage");
let counter = 0;
const cartPage = document.getElementById("cartPage");
const totalOrders = document.getElementById("total");

let totalPriceCart = document.getElementById("totalPriceCart");
let totalPrices = 0;

let numbItems = document.getElementById("numb-items");

const emptyBtn = document.getElementById("empty");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchedText = document.getElementById("searched-text");
const allProdText = document.getElementById("all-prod");
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authorizationAccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZDE0NzljNDM3MDAwMTkzYzM2ODIiLCJpYXQiOjE3MDg0NDYwMjMsImV4cCI6MTcwOTY1NTYyM30.QXvSO6Pxvxz3wzHGST5TFpR34SP4PlsEiZKbU6EHrso";

emptyBtn.addEventListener("click", () => {
    empty()
})

addToCartBtn.addEventListener("click", () => {
    cart()
})

homePage.forEach((element) => {
    element.addEventListener("click", () => {
        window.location.href = "index.html";
    })
})

backOffice.addEventListener("click", () => {
    window.location.href = "backoffice.html";
})

searchBtn.addEventListener("click", () => {
    getFromApi()
})

window.onload = getFromApi();

async function getFromApi() {
    spinner.classList.toggle("d-none");
    container.innerHTML = "";
    try {
        const res = await fetch((endpoint), {
            headers: {
                "Authorization": authorizationAccess
            }
        })
        const json = await res.json();
        search(json)
        spinner.classList.toggle("d-none");
    } catch (error) {
        console.log(error)
    }
}

function search(json) {
    let inputValue = searchInput.value;
    if (inputValue) {
        let filteredProducts = json.filter((item) => {
            return item.name.toLowerCase().includes(inputValue.toLowerCase().trim())
        })
        allProdText.classList.toggle("d-none")
        searchedText.classList.toggle("d-none")
        cycleRes(filteredProducts)
    } else {
        cycleRes(json)
    }
}

function cycleRes(json) {
    json.forEach((item) => {
        console.log(item)
        createCards(item)
    })
}

function createCards({ name, description, brand, imageUrl, price, _id }) {
    //     <div class="card" style="width: 18rem;">
    //   <img src="..." class="card-img-top" alt="...">
    //   <div class="card-body">
    //     <h5 class="card-title">Card title</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>
    //   </div>
    // </div>
    let cardCont = document.createElement("div");
    cardCont.classList.add("card", "col-md-3", "col-sm-6", "justify-content-around");

    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top", "img-fluid", "cover");
    cardImg.src = imageUrl;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.innerText = name;
    cardTitle.classList.add("overflow-title");

    let cardDesc = document.createElement("p");
    cardDesc.innerText = description;
    cardDesc.classList.add("overflow-desc");

    let cardBrand = document.createElement("p");
    cardBrand.innerText = brand;

    let cardPrice = document.createElement("h6");
    cardPrice.innerText = `$${price}`;
    cardPrice.style.fontWeight = "bold";

    let btnSection = document.createElement("div");
    btnSection.classList.add("d-flex", "justify-content-between");

    let detailsBtn = document.createElement("a");
    detailsBtn.addEventListener("click", () => {
        details(_id)
    });
    detailsBtn.classList.add("btn", "btn-dark");
    detailsBtn.style.width = "7em";
    detailsBtn.innerText = "Details";

    let cartBtn = document.createElement("a");
    cartBtn.classList.add("btn", "btn-warning");
    cartBtn.addEventListener("click", () => {
        addCart(imageUrl, name, brand, price, _id, cardCont);
        cardCont.classList.add("selected-item")
        cardCont.id = _id;
    })

    let cartIcon = document.createElement("i");
    cartIcon.classList.add("fa-solid", "fa-cart-shopping", "me-3");
    let cartSpan = document.createElement("span");
    cartSpan.innerText = "Add To Cart";

    cartBtn.appendChild(cartIcon);
    cartBtn.appendChild(cartSpan);

    btnSection.appendChild(detailsBtn);
    btnSection.appendChild(cartBtn)

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDesc);
    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(btnSection);

    cardCont.appendChild(cardImg);
    cardCont.appendChild(cardBody);

    container.appendChild(cardCont)
}
function details(id) {
    let detailsPage = "details.html";
    window.location.href = `${detailsPage}?id=${id}`;
}

function cart() {
    cartPage.classList.toggle("d-none");
    prodPage.classList.toggle("d-none");
}

function addCart(img, name, brand, price, id, cardCont) {
    let prodCont = document.createElement("div");
    prodCont.classList.add("d-flex", "container", "align-items-center", "my-3");
    prodCont.style.backgroundColor = "white";

    let prodImg = document.createElement("img");
    prodImg.src = img;
    prodImg.style.width = "100px";
    prodImg.classList.add("mx-3");

    let prodName = document.createElement("h4");
    prodName.innerText = name;
    prodName.classList.add("mx-3");


    let prodBrand = document.createElement("h4");
    prodBrand.innerText = brand;
    prodBrand.classList.add("mx-3");


    let prodPrice = document.createElement("h3");
    prodPrice.innerText = `$${price}`;
    prodPrice.classList.add("mx-3");

    let deleteProd = document.createElement("i");
    deleteProd.classList.add("fa-solid", "fa-x", "ms-5");
    deleteProd.style.cursor = "pointer";
    deleteProd.addEventListener("click", () => {
        deleteItem(price, prodCont, cardCont)
    })


    prodCont.appendChild(prodImg);
    prodCont.appendChild(prodName);
    prodCont.appendChild(prodBrand);
    prodCont.appendChild(prodPrice);
    prodCont.appendChild(deleteProd);

    cartBox.appendChild(prodCont);

    counter++;
    totalOrders.innerText = `Total items:${counter}`;
    numbItems.classList.remove("d-none");
    numbItems.innerText = counter;

    totalPrices += price;
    totalPriceCart.innerText = `Total price is:$${totalPrices}`;
}

function deleteItem(price, prodCont, cardCont) {
    let selectedCart = document.getElementById(cardCont.id);
    console.log(selectedCart);
    selectedCart.classList.remove("selected-item");
    counter--;
    totalOrders.innerText = `Total items:${counter}`;
    numbItems.innerText = counter;
    prodCont.remove();
    if (counter === 0) {
        numbItems.classList.add("d-none")
    }
    totalPrices = totalPrices - price;
    totalPriceCart.innerText = `Total price is:$${totalPrices}`;
}

function empty() {
    cartBox.innerHTML = "";
    let selectedItems = document.querySelectorAll(".selected-item");
    selectedItems.forEach((element) => {
        element.classList.remove("selected-item")
    })
    counter = 0;
    totalPrices = 0;
    totalPriceCart.innerText = `Total price is:$${totalPrices}`;
    totalOrders.innerText = `Total items:${counter}`;
    numbItems.classList.add("d-none");
}