<!doctype html>
<html lang="da">
    <head>
        <title>Maria Black | Official</title>
        <meta charset="utf-8">
        <meta name="robots" content="noindex">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="main.css">
        <script src="script.js"></script>
    </head>
    
    <body>
        <header>
        <!-- HERO AREA -->
            <div href="index.html" class="logo logo_box">
            </div>
        <!-- MENUS -->
            <!-- MAIN MENU -->
            <nav class="top_menu">
                <div class="top_menu_content_wrapper">
                    <a href="index.html">
                        <h4>Home</h4>
                    </a>
                    <a href="collection.php">
                        <h4>Collection</h4>
                    </a>
                    <a href="our-world.php" onclick="toggleArticleMenu();">
                        <h4>Our World</h4>
                    </a>
                </div>
            </nav>

            <section class="sectionwrapper">
                <div class="hero_image">
                </div>
            </section>

        <!-- UNDER HERO AREA -->
            <!-- COLLECTION FILTERING MENU -->
            <menu class="filtering_menu"></menu>

            <template class="filtering_parent_temp">
                <section class="filter_wrapper">
                    <p class="filter_parent"></p>
                    <div class="filter_children hidden"></div>
                </section>
            </template>

            <template class="filtering_temp">
                <p class="filtering_menu_item"></p>
            </template>

            <!-- PIERCING MENU -->
            <menu class="article_menu"></menu>

            <template class="piercing_menu_parent_temp">
                <section class="piercing_menu_wrapper">
                </section>
            </template>

            <template class="piercing_menu_item_temp">
                <p class="piercing_menu_item"></p>
            </template>

            <!-- ARTICLE MENU -->
            <menu class="article_menu"></menu>

            <template class="article_menu_item_temp">
                <p class="article_menu_item" onclick="loadArticle(this);"></p>
            </template>
        </header>