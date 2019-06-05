let baseUrl = "https://natachajay.dk/kea/2-semester/eksamen/wordpress/wp-json/wp/v2/";
let categoryList = [];

async function loadProductLoop(){
    // Gather category info
    let url = baseUrl + "product";
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    
    /*
    ** Indsæt alle produkter
    */
    let loopTemplate = document.querySelector(".upper_temp");
    let mainElement = document.querySelector("main.content");
    data.forEach(function(item) {
        // Tilføj til listen over produkter
        let klon = loopTemplate.cloneNode(true).content;
        klon.querySelector(".product_img").src = item.primary_product_image.guid;
        klon.querySelector(".product_title").innerHTML = item.title.rendered;
        klon.querySelector(".product_price").innerHTML = `&euro; ${item.price}`;
        //Tilføj categoryID som data-category
        let categoryId = item.categories[0];
        klon.dataset.categoryId = categoryId;
        // Tilføj categoryID til listen
        if (categoryList.indexOf(categoryId) === -1) {
            categoryList.push(categoryId)
        }
        mainElement.appendChild(klon);
    });
    
    /*
    ** Opsæt filtreringsmenu
    */
    // Hent alle kategorier
    let catUrl = baseUrl + "categories";
    let catJsonData = await fetch(catUrl);
    let catData = await catJsonData.json();
    // Filtrer alle kategorier vha. categoryList
    let filteredList = catData.filter(item => categoryList.includes(item.categories[0]));
    // For hver kategori der er tilbage:
        // Opret et element for kategorien i filtreringsmenuen med categoryID som data-cat
    let filterParentTemplate = document.querySelector(".filtering_parent_temp");
    let filterTemplate = document.querySelector(".filtering_temp");
    let filterMenu = document.querySelector(".filtering_menu");
    filteredList.forEach(function(item) {
        let klon = filterTemplate.cloneNode(true).content;
        klon.innerHTML = item.name;
        klon.dataset.categoryId = item.id;
        klon.dataset.categoryType = 'child';
        klon.addEventListener("click", function(){filterClick(this);});
        // If parent not exist:
        // Opret et element for parent hvis ikke allerede gjort
        let parent = filterMenu.querySelector(`[data-categoryId='${item.parent}']`);
        if (parent === null) {
            parent = addFilteringParent(item.parent, catData) 
        }
        parent.appendChild(klon);
    });
}

function filterClick(filterElement){
    
    /*
    ** Færdiggør filtreringsmenu
    */
    // Skjul alle produkter
    
    let main = document.querySelector("main.content");
    main.querySelectorAll(".sectionwrapper").forEach(product => product.classList.add("hidden"));
    
    // Hvis data-filter-type == parent:
    if (filterElement.dataset.categoryType === 'parent') {
        // Udfør OPERATION_D for alle børn
        filterElement.querySelectorAll(".filter_children > p").forEach(product => displayProducts(product.dataset.categoryId));
        // Fold alle ind
        document.querySelectorAll(".filter_wrapper.filter_children").forEach(child => child.classList.add("hidden"));
        // Fold den klikkede ud
        filterElement.querySelector(".filter_children").classList.remove("hidden");
    }
    else {
        displayProducts(filterElement.dataset.categoryId);
    }
}

function displayProducts(categoryId) {
    // Vis alle products med produktets categoryId === categoryId
    document.querySelectorAll(`.sectionwrapper[data-categoryId='${categoryId}']`).forEach(product => product.classList.remove("hidden"));
}

function addFilteringParent(parent_id, catData) {
    let filterMenu = document.querySelector(".filtering_menu");
    let parentCategory = catData.find(category => category.id === parent_id);
    let parentKlon = filterParentTemplate.cloneNode(true).content;
    parentKlon.querySelector(".filter_parent").innerHTML = parentCategory.name;
    parentKlon.dataset.categoryId = parent_id;
    parentKlon.dataset.categoryType = 'parent';
    parentKlon.addEventListener("click", function(){filterClick(this);});
    // Ryk barn ind i parent
    filterMenu.appendChild(parentKlon);
    return parentKlon;
}

function loadProductSingle(product) {
    // Tag produktets id
    // Hent produktet fra WP vha. id
    // Opret singleView for produktet
}

function displayPrevious() {
    // Find billedet med "vis" klassen
    // Skjul billedet
    // Find billedet der kommer lige inden
    // Hvis billedet ikke eksisterer: Find det sidste barn af parent
    // Vis det fundne billede
}

function displayNext() {
    // Find billedet med "vis" klassen
    // Skjul billedet
    // Find billedet der kommer lige efter
    // Hvis billedet ikke eksisterer: Find det første barn af parent
    // Vis det fundne billede
}
