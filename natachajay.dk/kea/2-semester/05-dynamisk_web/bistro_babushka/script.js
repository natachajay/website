let retter = [];
let filter="alle";

document.addEventListener("DOMContentLoaded", start);


async function start() {
    const myJson = await fetch("data.json");
    retter = await myJson.json();
    visRetter();
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtering);
    })
}

function visRetter() {
    const dest = document.querySelector("#liste");
    dest.innerHTML="";
    retter.forEach(ret => {
        if(filter == "alle" || filter == ret.kategori) { 
        let template = 
            `<div class="ret">
                <h3>${ret.navn}</h3>
                <br>
                <p>Nr. ${ret.id}</p>
                <br>
                <img src="https://www.natachajay.dk/media/kea_media/babushka/imgs/small/${ret.billede}-sm.jpg">
                <p>Kort beskrivelse: ${ret.kort}</p>
                <p>${ret.pris},-</p>
                <p>Oprindelse: ${ret.oprindelse}</p>
            </div>`;
            dest.insertAdjacentHTML("beforeend", template);
            dest.lastElementChild.addEventListener("click", () => { showSingle(ret);
            });
                                                   
            function showSingle(ret) {
                document.querySelector("#content").innerHTML =
                `<div class="ret">
                    <h3>${ret.navn}</h3>
                    <br>
                    <p>Nr. ${ret.id}</p>
                    <br>
                    <img src="https://www.natachajay.dk/media/kea_media/babushka/imgs/large/${ret.billede}.jpg">
                    <p>Beskrivelse: ${ret.lang}</p>
                    <p>${ret.pris},-</p>
                    <p>Oprindelse: ${ret.oprindelse}</p>
                </div>`;
                document.querySelector("#popup").style.display = "block";
                document.querySelector("#popup #close").addEventListener("click", close);
            }
            
            function close() {
                document.querySelector("#popup").style.display = "none";
            }
            }
        })
    }

function filtering() {
    filter = this.getAttribute("data-kategori");
    document.querySelector("h2").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visRetter();
}
