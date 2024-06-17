const productRow = document.getElementById("product-row");

let homeHref = document.querySelectorAll(".home");

const spinner = document.getElementById("spinner");

const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const authorizationAccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZDE0NzljNDM3MDAwMTkzYzM2ODIiLCJpYXQiOjE3MTg2MzY4NDMsImV4cCI6MTcxOTg0NjQ0M30.yTeolmiSqrq-pmJksX520SxMCStIRMF2BHkKi3HRTXg";

const params = new URLSearchParams(location.search);
const id = params.get("id");

homeHref.forEach(element => {
    element.addEventListener("click", () => {
        window.location.href = "index.html";
    })
});
window.onload = loadApi();

async function loadApi() {
    spinner.classList.toggle("d-none");
    try {
        const res = await fetch((`${endpoint}${id}`), {
            headers: {
                "Authorization": authorizationAccess
            }
        })
        const json = await res.json();
        spinner.classList.toggle("d-none");
        createHtml(json)
        console.log(json)
    } catch (error) {
        console.log(error)
    }
}

function createHtml({ name, description, brand, imageUrl, price }) {
    let productImgCol = document.createElement("div");
    productImgCol.classList.add("col-md-6", "col-sm-12", "mt-3");

    let productImg = document.createElement("img");
    productImg.src = imageUrl;
    productImg.classList.add("prod-img", "img-fluid");

    let productInfo = document.createElement("div");
    productInfo.classList.add("col-md-6", "col-sm-12", "mt-4");

    let prodName = document.createElement("h2");
    prodName.innerText = name;
    prodName.classList.add("p-3", "prod-name")

    let prodDesc = document.createElement("h4");
    prodDesc.innerText = `Description:${description}`;
    prodDesc.classList.add("p-3", "prod-desc");

    let prodBrand = document.createElement("h4");
    prodBrand.innerText = `Brand:${brand}`;
    prodBrand.classList.add("p-3", "prod-brand");

    let prodPrice = document.createElement("h3");
    prodPrice.innerText = `Price:$${price}`;
    prodPrice.classList.add("p-3", "prod-price");

    let addCartBtn = document.createElement("a");
    addCartBtn.classList.add("btn", "btn-warning", "cart-btn");

    let iconBtn = document.createElement("i");
    iconBtn.classList.add("fa-solid", "fa-star", "me-3");
    let textBtn = document.createElement("span");
    textBtn.innerText = "Add to favourite";

    addCartBtn.appendChild(iconBtn);
    addCartBtn.appendChild(textBtn);

    productImgCol.appendChild(productImg);

    productInfo.appendChild(prodName);
    productInfo.appendChild(prodDesc);
    productInfo.appendChild(prodBrand);
    productInfo.appendChild(prodPrice);
    productInfo.appendChild(addCartBtn)

    productRow.appendChild(productImgCol);
    productRow.appendChild(productInfo)
}