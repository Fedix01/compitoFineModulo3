const params = new URLSearchParams(window.location.search);
const myPid = params.get("pid");

const postName = document.getElementById("name");
const postDesc = document.getElementById("desc");
const postBrand = document.getElementById("brand");
const postImgUrl = document.getElementById("imageUrl");
const postPrice = document.getElementById("price");

const back = document.getElementById("backOffice");

const backHomePage = document.querySelectorAll(".homePage");

const alertMsg = document.getElementById("alert-msg");

const successMsg = document.getElementById("success-msg");

const postBtn = document.getElementById("post-btn");

const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const authorizationAccess = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZDE0NzljNDM3MDAwMTkzYzM2ODIiLCJpYXQiOjE3MTg2MzY4NDMsImV4cCI6MTcxOTg0NjQ0M30.yTeolmiSqrq-pmJksX520SxMCStIRMF2BHkKi3HRTXg";

backHomePage.forEach((element) => {
    element.addEventListener("click", () => {
        window.location.href = "index.html"
    })
})

back.addEventListener("click", () => {
    window.location.href = "backoffice.html"
})

postBtn.addEventListener("click", () => {
    edit()
})

window.onload = show();

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

async function edit() {
    if (postName.value && postDesc.value && postBrand.value && postImgUrl.value && postPrice.value) {
        try {
            const myPayload = { "name": postName.value, "description": postDesc.value, "brand": postBrand.value, "imageUrl": postImgUrl.value, "price": postPrice.value };
            const res = await fetch(endpoint + myPid, {
                method: "PUT",
                body: JSON.stringify(myPayload),
                headers: {
                    "Authorization": authorizationAccess,
                    "Content-Type": "application/json"
                }
            })
            successMsg.classList.toggle("d-none");
            setTimeout(() => {
                successMsg.classList.toggle("d-none")
            }, 5000);
        } catch (error) {
            console.log(error)
        }

    }
    else {
        alertMsg.classList.toggle("d-none");
        setTimeout(() => {
            alertMsg.classList.toggle("d-none")
        }, 5000);
    }
}