<?php 
    include ('header.php');
?>
        <div id="anchor_collection"></div>

        <!-- COLLECTION FILTERING MENU -->
        <menu class="filtering_menu">
            <section class="filter_wrapper" onclick="displayAllProducts();">
                <p class="filter_parent">All</p>
            </section>
        </menu>

        <template class="filtering_parent_temp">
            <section class="filter_wrapper">
                <p class="filter_parent"></p>
                <div class="filter_children hidden"></div>
            </section>
        </template>

        <template class="filtering_temp">
            <p class="filtering_menu_item"></p>
        </template>


        <!-- SINGLE VIEW -->
        <section class="singleview_sectionwrapper hidden">
            <div class="singleview_product_bg" onclick="exitSingleView(event);"></div>
            <div class="singleview_product_box">
                <div class="close_button buttons" onclick="exitSingleView();">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="5vh">
                        <line x1="0%" y1="0%" x2="100%" y2="100%" style="stroke: rgb(255,255,255);stroke-width: 4;"></line>
                        <line x1="100%" y1="0%" x2="0%" y2="100%" style="stroke: rgb(255,255,255);stroke-width: 4;"></line>
                    </svg>
                </div>
                
                <div class="singleview_img_sectionwrapper">
                    <div id="display_previous" class="buttons" onclick="displayPrevious();">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="5vh">
                            <line x1="0%" y1="50%" x2="100%" y2="100%" style="stroke: rgb(255,255,255);stroke-width: 4;"></line>
                            <line x1="100%" y1="0%" x2="0%" y2="50%" style="stroke: rgb(255,255,255);stroke-width: 4;"></line>
                        </svg>
                    </div>
                    <div class="singleview_img_section"></div>
                    <div id="display_next" class="buttons" onclick="displayNext();">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="5vh">
                            <line x1="0%" y1="0%" x2="100%" y2="50%" style="stroke: rgb(255,255,255);stroke-width: 4;"></line>
                            <line x1="100%" y1="50%" x2="0%" y2="100%" style="stroke: rgb(255,255,255);stroke-width: 4;"></line>
                        </svg>
                    </div>
                </div>
                
                <h3 class="product_title"></h3>
                <p class="product_description"></p>
                <strong class="product_price"></strong>
            </div>
        </section>
        
        <!-- LOOP VIEW -->
        <main class="content"></main>
        <template class="upper_temp">
            <section class="sectionwrapper product_box" onclick="loadProductSingle(this);">
                <img class="product_img">
                <h3 class="product_title"></h3>
                <strong class="product_price"></strong>
            </section>
        </template>
        <script>
            initiateProductLoop();
        </script>
<?php 
    include ('footer.php');
?>