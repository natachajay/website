
let retter = [];
let filter = "alle";

document.addEventListener("DOMContentLoaded", fetchJson);

//fetchJson (start) function

async function fetchJson() {
  const jsonData = await fetch("data.json");
  retter = await jsonData.json();
  visRetter();
}
//end

//visRetter function

function visRetter() {
    dest.innerHTML = "";
    retter.forEach(ret => {
        if (filter == "alle" || filter == ret.kategori) {
            let template ='
              <div class="ret">
                <h2>${ret.navn}</h2>
                <br>
                <p>Nr. ${ret.id}</p>
                <br>
                <img src="media/kea_media/babushka/imgs/small/${ret.billede}-sm.jpg">
                <p>Kort beskrivelse: ${ret.kort}</p>
                <p>${ret.pris},-</p>
                <p>Oprindelse: ${ret.oprindelse}</p>
              </div>
        ';
            dest.insertAdjacentHTML("beforeend", template);
            dest.lastElementChild.addEventListener("click", () => {
                location.href = "index.html" + ret.id;
            });

        }
    })

}
//end

// lav en filtrering function her (loop, singleview etc)
