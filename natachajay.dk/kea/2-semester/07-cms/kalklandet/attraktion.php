<?php
    include 'header.php';
?>
        <main class="indhold">
            <div id="hero_image">
                <div id="intro">
                    <h1 id="overskrift"></h1>
                    <p id="summary"></p>
                </div>
            </div>
        </main>
        <template id="outer_template">
            <div class="sectionwrapper">
                <div class="content_wrapper">
                    <div class="content">
                        <h2 class="underoverskrift"></h2>
                        <p class="post_summary"></p>
                    </div>
                    <img class="content_img" src="">
                    <nav class="undermenu">
                    </nav>
                    <div class="post_wrapper">
                    </div>
                </div>
            </div>
        </template>
        
        <template id="post_template">
                <div class="post_item hidden">
                    <h3 class="post_overskrift"></h3>
                    <p class="post_content"></p>
                    <img class="post_img" src="">
                </div>
        </template>
        
        <script>
        loadNavLoop("attraktioner");
        </script>
<?php
    include 'footer.php';
?>