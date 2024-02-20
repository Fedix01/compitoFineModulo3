const container = document.getElementById("searched-prod");

const backOffice = document.getElementById("backOffice");


const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authorizationAccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZDE0NzljNDM3MDAwMTkzYzM2ODIiLCJpYXQiOjE3MDg0NDYwMjMsImV4cCI6MTcwOTY1NTYyM30.QXvSO6Pxvxz3wzHGST5TFpR34SP4PlsEiZKbU6EHrso";

backOffice.addEventListener("click", () => {
    window.location.href = "backoffice.html";
})

window.onload = getFromApi();

async function getFromApi() {
    try {
        const res = await fetch((endpoint), {
            headers: {
                "Authorization": authorizationAccess
            }
        })
        const json = await res.json();
        cycleRes(json)
    } catch (error) {
        console.log(error)
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
    cardCont.classList.add("card", "col-md-3", "justify-content-around");

    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.src = imageUrl;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.innerText = name;

    let cardDesc = document.createElement("p");
    cardDesc.innerText = description;

    let cardBrand = document.createElement("p");
    cardBrand.innerText = brand;

    let cardPrice = document.createElement("h6");
    cardPrice.innerText = price;

    let cardBtn = document.createElement("button");
    cardBtn.addEventListener("click", () => {
        details(_id)
    });
    cardBtn.classList.add("btn", "btn-dark");
    cardBtn.innerText = "Details";


    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDesc);
    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardBtn)

    cardCont.appendChild(cardImg);
    cardCont.appendChild(cardBody);

    container.appendChild(cardCont)
}
function details(id) {
    let detailsPage = "details.html";
    window.location.href = `${detailsPage}?id=${id}`;
}