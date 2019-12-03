// JavaScript Document
/* jshint browser: true */
/* globals $:false */

// PORTFOLIO

// PORTFOLIO: GLOBAL VARIABLES

let baseUrl = "https://natachajay.dk/wordpress/wp-json/wp/v2/";
let categoryList = [];

async function initiateProjectLoop() {
    await loadProjects();
}

async function loadProjects() {
    // Gather category info
    let url = baseUrl + "project?per_page=100";
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    
    let loopTemplate = document.querySelector(".temp_portfolio");
    let mainElement = document.querySelector(".content_portfolio");
    data.forEach(function(item) {
        // Add to list of projects
        let klon = loopTemplate.cloneNode(true).content;
        klon.querySelector(".grid_box").style.backgroundImage = `url('${item.cover_image.guid}')`;
        // Add categoryID as data-category
        let categoryId = item.categories[0];
        klon.querySelector(".grid_box").dataset.categoryId = categoryId;
        // Add projectId
        klon.querySelector(".grid_box").dataset.projectId = item.id;
        // Add categoryId to the global variables list
        if (categoryList.indexOf(categoryId) === -1) {
            categoryList.push(categoryId)
        }
        mainElement.appendChild(klon);
    });
}

async function intitiateFilterMenu() {
    // Gather category info
    let catUrl = baseURL + "categories?per_page=100";
    let catJsonData = await fetch(catUrl);
    let catData = await catJsonData.json();
    // Filter all categories through categoryList
    let filteredList = catData.filter(item => categoryList.includes(item.id));
    // For every category
        // Create elm for category in the filter menu with categoryID as data-cat
    let filterTemplate = document.querySelector(".temp_filtering");
    let filterMenu = document.querySelector(".menu_filtering");
    filteredList.forEach(function(item) {
        let clone = filterTemplate.cloneNode(true).content;
        clone.querySelector(".menu_filtering_item").innerHTML = item.name;
        clone.querySelector(".menu_filtering_item").dataset.categoryId = item.id;
        clone.querySelector(".menu_filtering_item").addEventListener("click", function(event) {
            filterClick(this);
            event.stopPropagation();
        }, false);
    });
}

function filterClick(filterElement) {
    // Finish - what happens when you click a filter_menu_item?
}

