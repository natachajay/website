// JavaScript Document
/* jshint browser: true */
/* globals $:false */

// PORTFOLIO

// PORTFOLIO: GLOBAL VARIABLES

let baseUrl = "https://natachajay.dk/wordpress/wp-json/wp/v2/";
let categoryList = [];

async function initiateProjectLoop() {
    await loadProjects();
    initiateFilterMenu();
}

async function loadProjects() {
    // Gather category info
    let url = baseUrl + "project";
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    
    let loopTemplate = document.querySelector(".temp_portfolio");
    let mainElement = document.querySelector("#content_portfolio");
    data.forEach(function(item) {
        // Add to list of projects
        let klon = loopTemplate.cloneNode(true).content;
        klon.querySelector(".grid_box").style.backgroundImage = `url('${item.cover_image.guid}')`;
        // Add categoryID as data-category
        let categoryId = item.categories[0];
        klon.querySelector(".grid_box").dataset.categoryId = categoryId;
        // Add projectId
        klon.querySelector(".grid_box").dataset.projectId = item.id;
        mainElement.appendChild(klon);
    });
}

// FILTER MENU

async function initiateFilterMenu() {
    // Gather all categories
    let catUrl = baseUrl + "categories";
    let catJsonData = await fetch(catUrl);
    let catData = await catJsonData.json();
    // Remove 'uncategorized' category from list
    catData = catData.filter(jsonItem => jsonItem.id > 1);
    // Create element for category in filtering menu with catID as data-cat
    let filterTemplate = document.querySelector(".temp_filtering");
    let filterMenu = document.querySelector(".menu_filtering");
    catData.forEach(function(item) {
        let klon = filterTemplate.cloneNode(true).content;
        klon.querySelector(".menu_filtering_item").innerHTML = item.name;
        klon.querySelector(".menu_filtering_item").dataset.categoryId = item.id;
        klon.querySelector(".menu_filtering_item").addEventListener("click", function(event) {
            filterClick(this);
        });
        filterMenu.appendChild(klon);
    });
}

    function filterClick(filterElement) {
        // Remove "active" from all filtermenu_items
        let currentlyActive = document.querySelector(".menu_filtering_item.active");
        if ( currentlyActive != undefined ) {
            currentlyActive.classList.remove("active");
        }
        if ( currentlyActive == filterElement ) {
            document.querySelector(".menu_filtering_item.default").click();
        }
        else {
            // Add "active" to this filtermenu_item
            filterElement.classList.add("active");
            // Hide all projects
            let main = document.querySelector("main#content_portfolio");
            main.querySelectorAll(".grid_box").forEach(project => project.classList.add("hidden"));
            // Call function to display all corresponding project items
            displayProjects(filterElement.dataset.categoryId);
        }
    }

        function displayProjects(categoryId) {
            if (categoryId == "all" ) {
                displayAllProjects();
            } else {
                // Show all projects with corresponding categoryId
                document.querySelectorAll(`.grid_box[data-category-id='${categoryId}']`).forEach(project => project.classList.remove("hidden"));   
            }
        }

    function displayAllProjects() {
        // Show all projects
        document.querySelectorAll(".grid_box").forEach(project => project.classList.remove("hidden"));
    }

// SINGLEVIEW (UNDER CONSTRUCTION)

async function loadProjectSingle(project) {
    // Get project id
    let currentProject = project.dataset.projectId;
    // Get project from WP by id
    let projectUrl = baseUrl + `project/${currentProject}`;
    let projectJsonData = await fetch(projectUrl);
    let projectData = await projectJsonData.json();
    // Create singleView for current project
    let singleViewElm = document.querySelector(".singleview_sectionwrapper");
    singleViewElm.querySelector(".project_title").innerHTML = projectData.title.rendered;
    singleViewElm.querySelector(".project_description").innerHTML = projectData.content.rendered;
    
    // Check if project files exist individually
    
    // Insert project files
    
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



// END OF PORTFOLIO