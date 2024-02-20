const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const authorizationAccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZDE0NzljNDM3MDAwMTkzYzM2ODIiLCJpYXQiOjE3MDg0NDYwMjMsImV4cCI6MTcwOTY1NTYyM30.QXvSO6Pxvxz3wzHGST5TFpR34SP4PlsEiZKbU6EHrso";

const params = new URLSearchParams(location.search);
const id = params.get("id");

window.onload = loadApi();

async function loadApi() {
    try {
        const res = await fetch((`${endpoint}${id}`), {
            headers: {
                "Authorization": authorizationAccess
            }
        })
        const json = await res.json();
        console.log(json)
    } catch (error) {
        console.log(error)
    }
}