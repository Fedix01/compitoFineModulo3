const params = new URLSearchParams(window.location.search);
const myPid = params.get("pid");

const postName = document.getElementById("name");
const postDesc = document.getElementById("desc");
const postBrand = document.getElementById("brand");
const postImgUrl = document.getElementById("imageUrl");
const postPrice = document.getElementById("price");

const alertMsg = document.getElementById("alert-msg");


const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authorizationAccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZDE0NzljNDM3MDAwMTkzYzM2ODIiLCJpYXQiOjE3MDg0NDYwMjMsImV4cCI6MTcwOTY1NTYyM30.QXvSO6Pxvxz3wzHGST5TFpR34SP4PlsEiZKbU6EHrso";


async function show() {
    try {
        const res = await fetch(endpoint + myPid,
            {
                headers: {
                    "Authorization": authorizationAccess
                }
            });
        const json = await res.json();
        postName.value = json.name;
        postDesc.value = json.description;
        postBrand.value = json.brand;
        postImgUrl.value = json.imageUrl;
        postPrice.value = json.price
    } catch (error) {
        console.log(error)
    }
}