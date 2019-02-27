let retter = [];
let filter= "full";

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
    const dest = document.querySelector("#menu");
    dest.innerHTML="";
    retter.forEach(ret => {
        if(filter == "full" || filter == ret.kategori) { 
        let template = 
            `
            <div class="card">
                <div class="column content_column">
                    <div class="content">
                        <h3>${ret.navn}</h3>
                        <p>${ret.kategori}</p>
                        <p>${ret.kort}</p>
                        <p>${ret.pris},-</p>
                    </div>
                </div>
                
                <div class="column img_column">
                    <div class="ret_img">
                        <img class="spec_ret_img" src="https://www.natachajay.dk/media/kea_media/nzawu/${ret.billede}.jpg">
                    </div>
                </div>
            </div>
            `;
            dest.insertAdjacentHTML("beforeend", template);
            dest.lastElementChild.addEventListener("click", () => { showSingle(ret);
            });
                                                   
            function showSingle(ret) {
                document.querySelector("#popup_content").innerHTML =
                `
                <div class="card">
                    <div class="column content_column">
                        <div class="content">
                            <h3>${ret.navn}</h3>
                            <p>${ret.lang}</p>
                            <p>${ret.oprindelse}</p>
                            <p>${ret.pris}</p>
                        </div>
                    </div>

                    <div class="column img_column">
                        <div class="ret_img">
                            <img src="https://www.natachajay.dk/media/kea_media/nzawu/large/${ret.billede}.jpg">
                        </div>
                    </div>
                </div>
                `;
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
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("highlighted");
    })
    this.classList.add("highlighted");
    visRetter();
}
