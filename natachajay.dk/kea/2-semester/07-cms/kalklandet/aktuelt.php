<?php
    include 'header.php';
?>
        <main class="indhold">
            <div id="hero_image">
                <div id="intro">
                    <h1 id="overskrift"></h1>
                </div>
            </div>
        </main>
        <template>
            <div class="sectionwrapper">
                <div class="content_wrapper">
                    <p class="dato_oprettelse"></p>
                    <div class="content">
                        <h2 class="underoverskrift"></h2>
                        <p class="excerpt"></p>
                    </div>
                    <div class="post hidden">
                        <p class="post_start"></p>
                        <p class="post_slut"></p>
                        <p class="post_content"></p>
                        <img class="post_img" src="">
                    </div>
                </div>
            </div>
        </template>
        
        <script>
        loadAktueltLoop();
        </script>
<?php
    include 'footer.php';
?>