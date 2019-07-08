<?php 
    include ('header.php');
?>

        <!-- SINGLE VIEW -->
        <section class="singleview_sectionwrapper hidden">
            <div class="singleview_product_bg" onclick="exitSingleView(event);"></div>
            <div class="singleview_product_box">
                <div class="close_button" onclick="exitSingleView();">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="64px">
                        <line x1="0%" y1="0%" x2="100%" y2="100%" style="stroke: rgb(0, 0, 0);stroke-width: 4;"></line>
                        <line x1="100%" y1="0%" x2="0%" y2="100%" style="stroke: rgb(0, 0, 0);stroke-width: 4;"></line>
                    </svg>
                </div>
                
                <div onclick="displayPrevious();">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="64px">
                        <line x1="0%" y1="50%" x2="100%" y2="100%" style="stroke: rgb(0, 0, 0);stroke-width: 4;"></line>
                        <line x1="100%" y1="0%" x2="0%" y2="50%" style="stroke: rgb(0, 0, 0);stroke-width: 4;"></line>
                    </svg>
                </div>
                <div class="singleview_img_section"></div>
                <div onclick="displayNext();">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="64px">
                        <line x1="0%" y1="0%" x2="100%" y2="50%" style="stroke: rgb(0, 0, 0);stroke-width: 4;"></line>
                        <line x1="100%" y1="50%" x2="0%" y2="100%" style="stroke: rgb(0, 0, 0);stroke-width: 4;"></line>
                    </svg>
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