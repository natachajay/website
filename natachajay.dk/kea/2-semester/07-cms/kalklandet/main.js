let baseURL = "https://natachajay.dk/kea/2-semester/07-cms/kalklandet/wordpress/wp-json/wp/v2/";


async function loadNavLoop(slug){
    // Gather category info
    let url = baseURL + `categories?slug=${slug}`;
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    let categoryId = data[0].id;
    
    // Fill category info
    if (data[0].hero_image){
        document.getElementById('hero_image').style.backgroundImage = `url('${data[0].hero_image.guid}')`;
    } else {
        document.getElementById('hero_image').style.backgroundImage = "url('https://natachajay.dk/kea/2-semester/07-cms/kalklandet/wordpress/wp-content/uploads/2019/05/12747285_10207485059598118_4545225225364258132_o.jpg')";
    }
    document.getElementById('overskrift').textContent = data[0].name;
    document.getElementById('summary').innerHTML = data[0].summary;
    
    // Gather subcategories
    let subUrl = baseURL + `categories?parent=${categoryId}`;
    let subJsonData = await fetch(subUrl);
    let subData = await subJsonData.json();
    
    // Fill subcaterogies
    subData.forEach(item =>{
        let klon = document.getElementById("outer_template").cloneNode(true).content;
        klon.querySelector('.sectionwrapper').id = `subcategory_${item.id}`;
        klon.querySelector(".underoverskrift").textContent = item.name;
        klon.querySelector(".post_summary").innerHTML = item.summary;
        if (item.billede) {
            klon.querySelector(".content_img").src = item.billede.guid;
        }
        else {
            klon.querySelector(".content_img").remove();
        }
        // Append to main
        document.querySelector("main").appendChild(klon);
        
        // Gather nav
        let navUrl = baseURL + `posts?categories=${item.id}`;
        fetch(navUrl).then(navJsonData => {
            navJsonData.json().then(navData => {
                // Fill nav
                navData.forEach(navItem =>{
                    // Menu item
                    let navNode = document.createElement("SPAN");
                    navNode.innerHTML = navItem.title.rendered;
                    navNode.id = navItem.slug;
                    navNode.addEventListener("click", function(){
                        showNavPostItem(`post_${navNode.id}`);
                    });
                    document.getElementById(`subcategory_${navItem.categories[0]}`).querySelector(".undermenu").appendChild(navNode);

                    // Post item
                    let postClone = document.getElementById("post_template").cloneNode(true).content;
                    postClone.querySelector(".post_overskrift").innerHTML = navItem.title.rendered;
                    postClone.querySelector(".post_content").innerHTML = navItem.content.rendered;
                    postClone.querySelector(".post_item").id = `post_${navItem.slug}`;
                    if (navItem.billede) {
                        postClone.querySelector(".post_img").src = navItem.billede.guid;
                    }
                    else {
                        postClone.querySelector(".post_img").remove();
                    }
                    document.getElementById(`subcategory_${navItem.categories[0]}`).querySelector(".post_wrapper").appendChild(postClone);
                })
            })
        })
    })
}

async function loadLoop(slug){
    // Gather category info
    let url = baseURL + `categories?slug=${slug}`;
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    let categoryId = data[0].id;
    
    // Fill category info
    if (data[0].hero_image){
        document.getElementById('hero_image').style.backgroundImage = `url('${data[0].hero_image.guid}')`;
    } else {
        document.getElementById('hero_image').style.backgroundImage = "url('https://natachajay.dk/kea/2-semester/07-cms/kalklandet/wordpress/wp-content/uploads/2019/05/12747285_10207485059598118_4545225225364258132_o.jpg')";
    }
    document.getElementById('overskrift').textContent = data[0].name;
    
    let postsUrl = baseURL + `posts?categories=${categoryId}`;
    let postsJsonData = await fetch(postsUrl);
    let postsData = await postsJsonData.json();
    
    postsData.forEach(post => {
        let klon = document.querySelector("template").cloneNode(true).content;
        klon.querySelector(".underoverskrift").innerHTML = post.title.rendered;
        klon.querySelector(".content_text").innerHTML = post.content.rendered;
        if (post.billede) {
            klon.querySelector(".content_img").src = post.billede.guid;
        }
        else {
            klon.querySelector(".content_img").remove();
        }
        document.querySelector("main").appendChild(klon);
    });
}

async function loadIndex(){
    // Gather category info
    let url = baseURL + "categories?slug=forside";
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    let categoryId = data[0].id;
    
    // Fill category info
    if (data[0].hero_image){
        document.getElementById('hero_image').style.backgroundImage = `url('${data[0].hero_image.guid}')`;
    } else {
        document.getElementById('hero_image').style.backgroundImage = "url('https://natachajay.dk/kea/2-semester/07-cms/kalklandet/wordpress/wp-content/uploads/2019/05/12747285_10207485059598118_4545225225364258132_o.jpg')";
    }
    document.getElementById('overskrift').textContent = data[0].name;
    document.getElementById('summary').innerHTML = data[0].summary;
    
    let postsUrl = baseURL + `posts?categories=${categoryId}`;
    let postsJsonData = await fetch(postsUrl);
    let postsData = await postsJsonData.json();
    
    postsData.forEach(post => {
        let klon = document.querySelector("template").cloneNode(true).content;
        klon.querySelector(".overskrift").innerHTML = post.title.rendered;
        klon.querySelector(".content_text").innerHTML = post.content.rendered;
        if (post.billede) {
            klon.querySelector(".content_img").src = post.billede.guid;
        }
        else {
            klon.querySelector(".content_img").remove();
        }
    });
    
    let postsUrl = baseURL + "opslag?per_page=3&categories=";
    
    // Gather subcategories
    let subUrl = baseURL + `categories?parent=${categoryId}`;
    let subJsonData = await fetch(subUrl);
    let subData = await subJsonData.json();
    subData.forEach(sub => {
        postsUrl += `${sub.id},`;
    });
    
    let postsJsonData = await fetch(postsUrl);
    let postsData = await postsJsonData.json();
}

async function loadAktueltLoop(){
    // Gather category info
    let url = baseURL + "categories?slug=aktuelt";
    let jsonData = await fetch(url);
    let data = await jsonData.json();
    let categoryId = data[0].id;
    
    // Fill category info
    if (data[0].hero_image){
        document.getElementById('hero_image').style.backgroundImage = `url('${data[0].hero_image.guid}')`;
    } else {
        document.getElementById('hero_image').style.backgroundImage = "url('https://natachajay.dk/kea/2-semester/07-cms/kalklandet/wordpress/wp-content/uploads/2019/05/12747285_10207485059598118_4545225225364258132_o.jpg')";
    }
    document.getElementById('overskrift').textContent = data[0].name;
    
    let postsUrl = baseURL + "opslag?categories=";
    
    // Gather subcategories
    let subUrl = baseURL + `categories?parent=${categoryId}`;
    let subJsonData = await fetch(subUrl);
    let subData = await subJsonData.json();
    subData.forEach(sub => {
        postsUrl += `${sub.id},`;
    });
    
    let postsJsonData = await fetch(postsUrl);
    let postsData = await postsJsonData.json();
    
    postsData.forEach(post => {
        let klon = document.querySelector("template").cloneNode(true).content;
        klon.querySelector(".dato_oprettelse").innerHTML = post.dato_for_oprettelse;
        klon.querySelector(".underoverskrift").innerHTML = post.title.rendered;
        klon.querySelector(".excerpt").innerHTML = post.excerpt.rendered;
        let nullDato = "0000-00-00 00:00:00";
        let hasDato = post.starttid != undefined && post.sluttid != undefined;
        let isNullDato = post.starttid == nullDato || post.sluttid == nullDato;
        if (hasDato && !isNullDato) {
            klon.querySelector(".post_start").innerHTML = post.starttid;
            klon.querySelector(".post_slut").innerHTML = post.sluttid;
        }
        else {
            klon.querySelector(".post_start").remove();
            klon.querySelector(".post_slut").remove();
        }
        klon.querySelector(".post_content").innerHTML = post.content.rendered;
        if (post.billede) {
            klon.querySelector(".post_img").src = post.billede.guid;
        }
        else {
            klon.querySelector(".post_img").remove();
        }
        klon.querySelector(".sectionwrapper").addEventListener("click", function() {
            showPostItem(this);
        })
        document.querySelector("main").appendChild(klon);
    });
}

// Show post-items
function showPostItem(sectionwrapper){
    let post = sectionwrapper.querySelector(".post");
    let excerpt = sectionwrapper.querySelector(".excerpt");
    let hidden = post.classList.contains('hidden');
    if (hidden) {
        post.classList.remove('hidden');
        excerpt.classList.add('hidden');
    }
    else {
        post.classList.add('hidden');
        excerpt.classList.remove('hidden');
    }
}

// Show post-items
function showNavPostItem(element_id){
    let element = document.getElementById(element_id);
    let alreadyHidden = element.classList.contains('hidden');
    element.parentElement.querySelectorAll(".post_item").forEach(item =>{
        item.classList.add('hidden');
    });
    if (alreadyHidden) {
        element.classList.remove('hidden');
    }
}

// TODO
// Alternate positions - if divisible by 2, align by adding 'reverse' class
