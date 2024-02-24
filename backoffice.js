let home = document.getElementById("home");

const tBody = document.getElementById("tBody");

const postName = document.getElementById("name");
const postDesc = document.getElementById("desc");
const postBrand = document.getElementById("brand");
const postImgUrl = document.getElementById("imageUrl");
const postPrice = document.getElementById("price");

const alertMsg = document.getElementById("alert-msg");
const deleteMsg = document.getElementById("delete-msg");
const postMsg = document.getElementById("post-msg");
const postBtn = document.getElementById("post-btn");

postBtn.addEventListener("click", () => {
    createItem()
})

const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authorizationAccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZDE0NzljNDM3MDAwMTkzYzM2ODIiLCJpYXQiOjE3MDg0NDYwMjMsImV4cCI6MTcwOTY1NTYyM30.QXvSO6Pxvxz3wzHGST5TFpR34SP4PlsEiZKbU6EHrso";

home.addEventListener("click", () => {
    window.location.href = "index.html"
})

window.onload = getFromApi();

async function getFromApi() {
    tBody.innerHTML = "";
    try {
        const res = await fetch((endpoint), {
            headers: {
                "Authorization": authorizationAccess
            }
        });
        const json = await res.json();
        console.log(json)
        cycleRes(json)
    } catch (error) {
        console.log(error)
    }
}

function cycleRes(json) {
    json.forEach((item) => {
        createTable(item)
    })
}

function createTable({ _id, name, description, brand, imageUrl, price }) {
    // Template tipo:
    // --------------
    // <tr>
    //     <th>Name</th>
    //     <td>Description</td>
    //     <td>Brand</td>
    //     <td>ImageUrl</td>
    //     <td>Price</td>
    //     <td>
    //         <a class="btn btn-primary btn-sm">
    //             <i class="fa-solid fa-pencil" aria-hidden="true"></i>
    //             <span class="ms-1">Edit</span>
    //         </a>
    //         <a class="btn btn-danger btn-sm ms-1">
    //             <i class="fa-solid fa-trash" aria-hidden="true"></i>
    //             <span class="ms-1">Delete</span>
    //         </a>
    //     </td>
    // </tr>
    let tRows = document.createElement("tr");

    let rowName = document.createElement("th");
    rowName.innerText = name;
    let rowDesc = document.createElement("td");
    rowDesc.innerText = description;
    rowDesc.style.maxWidth = "500px";
    let rowBrand = document.createElement("td");
    rowBrand.innerText = brand;
    let rowImg = document.createElement("td");
    let img = document.createElement("img");
    img.src = imageUrl;
    img.style.width = "40px";
    rowImg.appendChild(img);
    let rowPrice = document.createElement("td");
    rowPrice.innerText = `$${price}`;

    let rowBtns = document.createElement("td");


    // Edit(modify) button
    let editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-primary", "btn-sm");
    editBtn.href = `edit.html?pid=${_id}`;
    editBtn.target = "_self";
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pencil");
    let editText = document.createElement("span");
    editText.innerText = "Edit";
    editText.classList.add("ms-1");

    rowBtns.appendChild(editBtn);
    editBtn.appendChild(editIcon);
    editBtn.appendChild(editText);


    // Delete button
    let deleteBtn = document.createElement("a");
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-1");
    deleteBtn.addEventListener("click", () => {
        deleteItem(_id)
    })
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    let deleteText = document.createElement("span");
    deleteText.innerText = "Delete";
    deleteText.classList.add("ms-1");

    rowBtns.appendChild(deleteBtn);
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(deleteText);



    tRows.appendChild(rowName);
    tRows.appendChild(rowDesc);
    tRows.appendChild(rowBrand);
    tRows.appendChild(rowImg);
    tRows.appendChild(rowPrice);
    tRows.appendChild(rowBtns);

    tBody.appendChild(tRows);

}


async function createItem() {
    if (postName.value && postDesc.value && postBrand.value && postImgUrl.value && postPrice.value) {
        try {
            let newPost = { "name": postName.value, "description": postDesc.value, "brand": postBrand.value, "imageUrl": postImgUrl.value, "price": postPrice.value }
            const res = await fetch(endpoint, {
                method: "POST", body: JSON.stringify(newPost), headers: { "Authorization": authorizationAccess, "Content-type": "application/json;charset=UTF-8" }
            })
            getFromApi();
            postName.value = "";
            postDesc.value = "";
            postBrand.value = "";
            postImgUrl.value = "";
            postPrice.value = "";
            postMsg.classList.toggle("d-none");
            setTimeout(() => {
                postMsg.classList.toggle("d-none");
            }, 5000)
        } catch (error) {
            console.log(error)
        }
    } else {
        alertMsg.classList.toggle("d-none");
        setTimeout(() => {
            alertMsg.classList.toggle("d-none");
        }, 5000)
    }
}

async function deleteItem(id) {
    try {
        const res = await fetch(endpoint + id, {
            method: "DELETE",
            headers: {
                "Authorization": authorizationAccess
            }
        })
        deleteMsg.classList.toggle("d-none");
        setTimeout(() => {
            deleteMsg.classList.toggle("d-none");
        }, 5000)
        getFromApi();
    } catch (error) {
        console.log(error)
    }
}