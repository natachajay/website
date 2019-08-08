<?php
    include 'header.php';
?>

<!-- ARTICLE CONTENT -->

<!-- LIST VIEW -->
        <main id="article_anchor" class="ourworld_content">
            <div id="article_singleview" class="hidden">
                <div class="article_close_button" onclick="exitArticleSingleView();">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" height="64px">
                        <line x1="0%" y1="0%" x2="100%" y2="100%" style="stroke: rgb(0, 0, 0);stroke-width: 4;"></line>
                        <line x1="100%" y1="0%" x2="0%" y2="100%" style="stroke: rgb(0, 0, 0);stroke-width: 4;"></line>
                    </svg>
                </div>
                <h1 class="article_singleview_title"></h1>
                <div class="article_singleview_content"></div>
            </div>
        </main>
        <template class="article_temp">
            <div class="article_cta" data-slug="undefined" onclick="articleSingleView(this);">
                <div class="article_cta_box">
                    <h1 class="article_cta_title"></h1>
                    <div class="article_overlay overlay"></div>
                </div>
                <!-- SINGLE VIEW -->
                <div class="article_content hidden"></div>
            </div>
        </template>

        <script>
            articleListView();
        </script>

<?php
    include 'footer.php';
?>