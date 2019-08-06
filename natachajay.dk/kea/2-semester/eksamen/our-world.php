<?php
    include 'header.php';
?>

<!-- ARTICLE CONTENT -->

<!-- LIST VIEW -->
        <main class="ourworld_content">
            <div id="article_singleview" class="hidden">
                <h2 onclick="exitArticleSingleView();">CLOSE</h2>
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