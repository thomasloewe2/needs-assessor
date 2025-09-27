<?php
// Security measure
if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="needs-assessor-container">
    
    <h2>Test dit internet behov</h2>

    <div class="needs-assessor-result">
        <div class="speedometer-container">
            <svg viewBox="0 0 250 145" class="speedometer-svg">
                <path class="speedometer-bg" d="M15 110 A 110 110 0 0 1 235 110"></path>
                <path id="speedometer-progress" class="speedometer-progress" d="M15 110 A 110 110 0 0 1 235 110"></path>
            </svg>
            <div id="mbit-result">0 Mbit</div>
        </div>
        <p><strong>Anbefalede teknologier:</strong></p>
        <ul id="tech-recommendations">
            </ul>
    </div>

    <div class="needs-assessor-form" id="internet-needs-form">
        <div class="form-group">
            <p>Antal personer i din husstand?</p>
            <div class="form-options">
                <input type="radio" id="persons-1" name="persons" value="1" checked>
                <label for="persons-1">1</label>

                <input type="radio" id="persons-2-3" name="persons" value="2-3">
                <label for="persons-2-3">2-3</label>

                <input type="radio" id="persons-4" name="persons" value="4+">
                <label for="persons-4">4+</label>
            </div>
        </div>

        <div class="form-group">
            <p>Streamer du?</p>
            <div class="form-options">
                <input type="radio" id="streaming-no" name="streaming" value="no" checked>
                <label for="streaming-no">Nej</label>

                <input type="radio" id="streaming-some" name="streaming" value="some">
                <label for="streaming-some">Lidt</label>

                <input type="radio" id="streaming-much" name="streaming" value="much">
                <label for="streaming-much">Meget</label>
            </div>
        </div>

        <div class="form-group">
            <p>Gamer du?</p>
            <div class="form-options">
                <input type="radio" id="gaming-no" name="gaming" value="no" checked>
                <label for="gaming-no">Nej</label>

                <input type="radio" id="gaming-some" name="gaming" value="some">
                <label for="gaming-some">Lidt</label>

                <input type="radio" id="gaming-much" name="gaming" value="much">
                <label for="gaming-much">Meget</label>
            </div>
        </div>

        <div class="form-group">
            <p>Arbejder du hjemmefra?</p>
            <div class="form-options">
                <input type="radio" id="workfromhome-no" name="workfromhome" value="no" checked>
                <label for="workfromhome-no">Nej</label>

                <input type="radio" id="workfromhome-some" name="workfromhome" value="some">
                <label for="workfromhome-some">Lidt</label>

                <input type="radio" id="workfromhome-much" name="workfromhome" value="much">
                <label for="workfromhome-much">Meget</label>
            </div>
        </div>
    </div>
</div>