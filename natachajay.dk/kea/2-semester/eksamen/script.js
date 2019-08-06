let baseUrl = "https://natachajay.dk/kea/2-semester/eksamen/wordpress/wp-json/wp/v2/";
let categoryList = [];

// COLLECTION

async function initiateProductLoop(){
    // Indsæt alle produkter
    await loadProducts();
    // Opsæt filtreringsmenu
    initiateFilterMenu();
}

async function loadProducts() {
    // Gather category info
    let url = baseUrl + "product?per_page=100";
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    
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
        //Tilføj productId
        klon.querySelector(".sectionwrapper").dataset.productId = item.id;
        // Tilføj categoryID til listen
        if (categoryList.indexOf(categoryId) === -1) {
            categoryList.push(categoryId)
        }
        mainElement.appendChild(klon);
    });
}

async function initiateFilterMenu() {
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
        klon.querySelector(".filtering_menu_item").addEventListener("click", function(event){
            filterClick(this);
            event.stopPropagation();
        }, false);
        // If parent doesn't exist:
        // Opret et element for parent hvis ikke allerede gjort
        let parent = filterMenu.querySelector(`[data-category-id='${item.parent}']`);
        if (parent == null) {
            parent = addFilteringParent(item.parent, catData) 
        }
        parent.querySelector(".filter_children").appendChild(klon);
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
        document.querySelectorAll(".filter_wrapper > .filter_children").forEach(child => child.classList.add("hidden"));
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
    parentKlon.querySelector(".filter_wrapper").addEventListener("click", function(event){
        filterClick(this);
        event.stopPropagation();
    }, false);
    // Ryk barn ind i parent
    filterMenu.appendChild(parentKlon);
    return filterMenu.querySelector(`.filter_wrapper[data-category-id='${parent_id}']`);
}

// Product = sectionwrapper
async function loadProductSingle(product) {
    // Tag produktets id
    let currentProduct = product.dataset.productId;
    // Hent produktet fra WP vha. id
    let productUrl = baseUrl + `product/${currentProduct}`;
    let productJsonData = await fetch(productUrl);
    let productData = await productJsonData.json();
    // Opret singleView for produktet
    let singleViewElm = document.querySelector(".singleview_sectionwrapper");
    singleViewElm.querySelector(".product_title").innerHTML = productData.title.rendered;
    singleViewElm.querySelector(".product_description").innerHTML = productData.content.rendered;
    singleViewElm.querySelector(".product_price").innerHTML = `€ ${productData.price}`;
    // Check om billederne eksisterer enkeltvis
    let singleViewImgs = document.querySelector(".singleview_img_section");
    singleViewImgs.innerHTML = "";
    let primaryProductImg = productData.primary_product_image;
    if (primaryProductImg) {
        let element = document.createElement("img");
        element.src = primaryProductImg.guid;
        element.classList.add("shown");
        singleViewImgs.appendChild(element);
        
        let secondProductImg = productData.secondary_product_image;
        if (secondProductImg) {
            element = document.createElement("img");
            element.src = secondProductImg.guid;
            singleViewImgs.appendChild(element);
            
            let thirdProductImg = productData.third_product_image;
            if (thirdProductImg) {
                element = document.createElement("img");
                element.src = thirdProductImg.guid;
                singleViewImgs.appendChild(element);
                
                let extraProductImg = productData.extra_product_image;
                if (extraProductImg) {
                    element = document.createElement("img");
                    element.src = extraProductImg.guid;
                    singleViewImgs.appendChild(element);
                }
            }
        }
    }
    
    singleViewElm.classList.remove("hidden");
}

function exitSingleView(event) {
    document.querySelector(".singleview_sectionwrapper").classList.add("hidden");
}


function displayPrevious() {
    // Find billedet med "vis" klassen og skjul det
    let currentElm = document.querySelector(".singleview_img_section img.shown");
    currentElm.classList.remove("shown");
    // Find billedet der kommer lige inden
    let prevElm = currentElm.previousElementSibling;
    // Hvis billedet ikke eksisterer: Find det sidste barn af parent
    if (prevElm == null) {
        prevElm = currentElm.parentElement.lastChild;
    }
    // Vis det fundne billede
    prevElm.classList.add("shown");
}

function displayNext() {
    // Find billedet med "vis" klassen
    let currentElm = document.querySelector(".singleview_img_section img.shown");
    // Skjul billedet
    currentElm.classList.remove("shown");
    // Find billedet der kommer lige efter
    let nextElm = currentElm.nextElementSibling;
    // Hvis billedet ikke eksisterer: Find det første barn af parent
    if (nextElm == null) {
        nextElm = currentElm.parentElement.firstChild;
    }
    // Vis det fundne billede
    nextElm.classList.add("shown");
}

// OUR WORLD

// skal loade den pågældende artikel efter man er landet i our-world.php
async function articleSingleView(slug) {
    // find artiklens slug ud fra GET parametre
    
    // find pågældende artikel og jsonify den vha. slug
    // indsæt titel + content
}

// skal loade når hjemmesiden loader
async function articleListView() {
    // find artikler og jsonify dem
    let articleUrl = baseUrl + "posts";
    let articleJsonData = await fetch(articleUrl);
    let articleData = articleJsonData.json();
    
    // klon artikel template for hver artikel
    let articleTemplate = document.querySelector(".article_temp");
    let mainArticleElement = document.querySelector("main.article_content");
    articleData.forEach(function(article) {
        let klon = articleTemplate.cloneNode(true).content;
        klon.querySelector(".article_cta_title").innerHTML = articleData.title.rendered;
        klon.querySelector(".article_overlay").backgroundImage = articleData.featured_image;
        klon.querySelector(".article_cta").setAttribute("href", "`https://natachajay.dk/kea/2-semester/eksamen/wordpress/wp-json/wp/v2/posts?slug=${articleData.slug}/`");
        }
        mainArticleElement.appendChild(klon);
    );

function toggleArticleMenu() {
    
}