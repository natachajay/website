let baseUrl = "https://natachajay.dk/kea/2-semester/eksamen/wordpress/wp-json/wp/v2/";
let categoryList = [];

async function loadProductLoop(){
    // Gather category info
    let url = baseUrl + "product?per_page=100";
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
        klon.querySelector(".sectionwrapper").dataset.categoryId = categoryId;
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
    let catUrl = baseUrl + "categories?per_page=100";
    let catJsonData = await fetch(catUrl);
    let catData = await catJsonData.json();
    // Filtrer alle kategorier vha. categoryList
    let filteredList = catData.filter(item => categoryList.includes(item.id));
    // For hver kategori der er tilbage:
        // Opret et element for kategorien i filtreringsmenuen med categoryID som data-cat
    let filterParentTemplate = document.querySelector(".filtering_parent_temp");
    let filterTemplate = document.querySelector(".filtering_temp");
    let filterMenu = document.querySelector(".filtering_menu");
    filteredList.forEach(function(item) {
        let klon = filterTemplate.cloneNode(true).content;
        klon.querySelector(".filtering_menu_item").innerHTML = item.name;
        klon.querySelector(".filtering_menu_item").dataset.categoryId = item.id;
        klon.querySelector(".filtering_menu_item").dataset.categoryType = 'child';
        klon.querySelector(".filtering_menu_item").addEventListener("click", function(){filterClick(this);}, false);
        // If parent not exist:
        // Opret et element for parent hvis ikke allerede gjort
        let parent = filterMenu.querySelector(`[data-category-id='${item.parent}']`);
        if (parent == null) {
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
    document.querySelectorAll(`.sectionwrapper[data-category-id='${categoryId}']`).forEach(product => product.classList.remove("hidden"));
}

function addFilteringParent(parent_id, catData) {
    let filterMenu = document.querySelector(".filtering_menu");
    let parentCategory = catData.find(category => category.id === parent_id);
    let parentKlon = document.querySelector(".filtering_parent_temp").cloneNode(true).content;
    parentKlon.querySelector(".filter_parent").innerHTML = parentCategory.name;
    parentKlon.querySelector(".filter_wrapper").dataset.categoryId = parent_id;
    parentKlon.querySelector(".filter_wrapper").dataset.categoryType = 'parent';
    parentKlon.querySelector(".filter_wrapper").addEventListener("click", function(){filterClick(this);}, false);
    // Ryk barn ind i parent
    filterMenu.appendChild(parentKlon);
    return filterMenu.querySelector(`.filter_wrapper[data-category-id='${parent_id}']`);
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
