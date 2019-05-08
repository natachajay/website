<?php
    include 'header.php';
?>
        <div id="hero_image">
            <div id="intro">
                <h1 id="overskrift"></h1>
                <p id="summary"></p>
            </div>
        </div>
        <main id="indhold"></main>
        <template id="upper_template">
            <div class="sectionwrapper">
                <div class="content_wrapper">
                    <div class="content">
                        <h2 class="overskrift"></h2>
                        <p class="content_text"></p>
                    </div>
                    <div class="content_img">
                    </div>
                </div>
            </div>
        </template>

        <template id="lower_template">
            <div class="opslag" onclick="window.location.href='aktuelt.php'">
                <p class="oprettelse_dato"></p>
                <h2 class="aktuelt_overskrift"></h2>
                <p class="excerpt"></p>
            </div>
        </template>

        <div class="sectionwrapper">
            <div class="aktuelt_wrapper">
                <h2 id="aktuelt">Seneste</h2>
            </div>
        </div>
        <script>loadIndex();</script>

<?php
    include 'footer.php';
?>