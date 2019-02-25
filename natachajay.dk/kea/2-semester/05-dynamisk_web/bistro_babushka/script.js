let retter = [];
let filter="alle";

document.addEventListener("DOMContentLoaded", start);


async function start() {
    const myJson = await fetch("data.json");
    retter = await myJson.json();
    visRetter();
}

function visRetter() {
    const dest = document.querySelector("#liste");
    dest.innerHTML="";
    retter.forEach(ret => {
        if(filter == "alle" || filter == ret.kategori) { 
        dest.innerHTML += 
            `<div class="ret">
                <h2>${ret.navn}</h2>
                <br>
                <p>Nr. ${ret.id}</p>
                <br>
                <img src="https://www.natachajay.dk/media/kea_media/babushka/imgs/small/${ret.billede}-sm.jpg">
                <p>Kort beskrivelse: ${ret.kort}</p>
                <p>${ret.pris},-</p>
                <p>Oprindelse: ${ret.oprindelse}</p>
            </div>`;
            }
        })
    }

document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", filtering);
})

function filtering(){
    filter = this.getAttribute("data-kategori");
    document.querySelector("h2").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visRetter();
}


// lav filtrering function her