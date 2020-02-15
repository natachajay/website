// JavaScript Document
/* jshint browser: true */
/* globals $:false */

// OVERALL

function initiateUpBtn() {
    let upBtn = document.querySelector("#up_button");
    let tippingPoint = window.innerHeight;

    window.addEventListener("scroll", function() {
        if ( window.pageYOffset > tippingPoint ) {
            upBtn.classList.remove("hidden");
        }
        else {
            upBtn.classList.add("hidden");
        }
    });

    window.addEventListener("resize", function() {
        tippingPoint = window.innerHeight;
    });
}

// PORTFOLIO

// PORTFOLIO: GLOBAL VARIABLES

var baseUrl = "https://natachajay.dk/wordpress/wp-json/wp/v2/";
var categoryList = [];
var projectFiles;
const videoCategory = 4;

async function initiateProjectLoop() {
    await loadProjects();
    initiateFilterMenu();
}

async function loadProjects() {
    // Gather category info
    let page = 1;

    while (true) {
      let url = baseUrl + `project?page=${page}`;
      let jsonData = await fetch(url);
      let data = await jsonData.json();
      let total_pages = jsonData.headers.get('X-WP-TotalPages')

      let loopTemplate = document.querySelector(".temp_portfolio");
      let mainElement = document.querySelector("#content_portfolio");
      data.forEach(function(item) {
          // Add to list of projects
          let klon = loopTemplate.cloneNode(true).content;
          klon.querySelector(".grid_box").style.backgroundImage = `url('${item.cover_image.guid}')`;
          // Check to see if project_files is empty (false)
          // Contains an array of JSON objects if not empty, otherwise boolean false
          if ( item.project_files !== false ) {
              // Not empty - insert icon
              klon.querySelector(".grid_box").innerHTML = '<img src="https://www.natachajay.dk/landing/media/icons/multiple_files.svg" alt="Multiple Files" class="multiple_icon">';
          }
          // Add categoryID as data-category
          let categoryId = item.categories[0];
          klon.querySelector(".grid_box").dataset.categoryId = categoryId;
          // Add projectId
          klon.querySelector(".grid_box").dataset.projectId = item.id;
          mainElement.appendChild(klon);
      });
      if (page == total_pages) {
        break;
      }
      else {
        page++;
      }
    }
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

// SINGLEVIEW

async function loadProjectSingle(project) {
    // Get project id
    var currentProject = project.dataset.projectId;
    // Get project from WP by id
    let projectUrl = baseUrl + `project/${currentProject}`;
    let projectJsonData = await fetch(projectUrl);
    let projectData = await projectJsonData.json();
    let singleViewElm;
    // Create singleView for current project
    if ( projectData.categories[0] == videoCategory ) {
        singleViewElm = document.querySelector("#video_singleview");
        loadProjectSingleVideo(projectData);
    }
    else {
        singleViewElm = document.querySelector("#default_singleview");
        loadProjectSingleDefault(projectData);
    }
    singleViewElm.querySelector(".project_title").innerHTML = projectData.title.rendered;
    singleViewElm.querySelector(".project_description").innerHTML = projectData.content.rendered;

    singleViewElm.classList.remove("hidden");
}

function loadProjectSingleDefault(projectData) {
    // Get project files from array?
    projectFiles = projectData.project_files;
    let coverEntry = {"guid":projectData.cover_image.guid};

    // Insert cover-img first
    var singleViewImg = document.querySelector(".singleview_img");
    singleViewImg.alt = `${projectData.title.rendered}`;

    if ( projectFiles !== false ) {
        projectFiles.unshift(coverEntry);
        singleViewImg.src = projectFiles[0].guid;
        singleViewImg.dataset.position = 0;
        showArrows();
    }
    else {
        singleViewImg.src = coverEntry.guid;
        hideArrows();
    }
}

function loadProjectSingleVideo(projectData) {
    document.querySelector('#video_singleview_iframe_wrapper').innerHTML = `<iframe width="853" height="505" src="https://www.youtube.com/embed/${projectData.youtube_id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    document.querySelector('#video_singleview').classList.remove("hidden");
}

function hideArrows() {
    document.querySelector('#display_previous').classList.add('hidden');
    document.querySelector('#display_next').classList.add('hidden');
}

function showArrows() {
    document.querySelector('#display_previous').classList.remove('hidden');
    document.querySelector('#display_next').classList.remove('hidden');
}

function exitSingleView(element) {
    element.closest(".singleview").classList.add("hidden");
    // Just in case
    projectFiles = false;
    document.querySelector('#video_singleview_iframe_wrapper').innerHTML = "";
}

// TO DO

function displayPrevious() {
    if ( projectFiles === false ) {
        return;
    }

    let singleViewImg = document.querySelector(".singleview_img");
    let singleViewImgPos = --singleViewImg.dataset.position;

    if ( singleViewImgPos == -1 ) {
        singleViewImgPos += projectFiles.length;
        singleViewImg.dataset.position = singleViewImgPos;
    }

    singleViewImg.src = projectFiles[singleViewImgPos].guid;
}

function displayNext() {
    if ( projectFiles === false ) {
        return;
    }
    let singleViewImg = document.querySelector(".singleview_img");
    let singleViewImgPos = ++singleViewImg.dataset.position;

    if ( singleViewImgPos == projectFiles.length ) {
        singleViewImgPos = 0;
        singleViewImg.dataset.position = singleViewImgPos;
    }

    singleViewImg.src = projectFiles[singleViewImgPos].guid;

}

// END OF PORTFOLIO
