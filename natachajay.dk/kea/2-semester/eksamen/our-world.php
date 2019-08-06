<?php
    include 'header.php';
?>

<!-- ARTICLE CONTENT -->
        <main class="article_content"></main>
        <template class="article_temp">
            <div class="article_cta">
                <h1 class="article_cta_title"></h1>
                <div class="article_overlay overlay"></div>
            </div>
        </template>

        <template class="article_content_temp">
            <div class="article_content">
                <h1 class="article_title"></h1>
                <div class="article_content">
                </div>
            </div>
        </template>

        <script>
            articleListView();
        </script>

<?php
    include 'footer.php';
?>