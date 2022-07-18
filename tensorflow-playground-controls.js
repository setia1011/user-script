// ==UserScript==
// @name         Tensorflow Playground
// @namespace    http://techack.id
// @homepageURL  https://greasyfork.org/en/scripts/14755-instagram-reloaded
// @version      2.30
// @description  Tensorflow Playground controls
// @author       Setiadi
// @match        https://playground.tensorflow.org/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// ==/UserScript==


(function($) {
    // Time counter
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    var prev_hours = undefined;
    var prev_minutes = undefined;
    var prev_seconds = undefined;
    var prev_milliseconds = undefined;
    var timeUpdate;

    // Start
    // updateTime(0,0,0,0);
    // Pause
    // clearInterval(timeUpdate);
    // Resume
    // updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds);
    // Reset
    // setStopwatch(0,0,0,0);


    // Update time in stopwatch periodically - every 1ms
    function updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds){
        var startTime = new Date(); // fetch current time
        timeUpdate = setInterval(function () {
            var timeElapsed = new Date().getTime() - startTime.getTime(); // calculate the time elapsed in milliseconds
            // calculate hours
            hours = parseInt(timeElapsed / 1000 / 60 / 60) + prev_hours;
            // calculate minutes
            minutes = parseInt(timeElapsed / 1000 / 60) + prev_minutes;
            if (minutes > 60) minutes %= 60;
            // calculate seconds
            seconds = parseInt(timeElapsed / 1000) + prev_seconds;
            if (seconds > 60) seconds %= 60;
            // calculate milliseconds
            milliseconds = timeElapsed + prev_milliseconds;
            if (milliseconds > 1000) milliseconds %= 1000;
            // set the stopwatch
            setStopwatch(hours, minutes, seconds, milliseconds);

            console.log(hours+":"+minutes+":"+seconds+":"+milliseconds);

        }, 1); // update time in stopwatch after every 1ms
    }

    // Set the time in stopwatch
    function setStopwatch(hours, minutes, seconds, milliseconds){
        prependZero(hours, 2);
        prependZero(minutes, 2);
        prependZero(seconds, 2);
        prependZero(milliseconds, 3);
    }

    // Prepend zeros to the digits in stopwatch
    function prependZero(time, length) {
        time = new String(time); // stringify time
        return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
    }

    // Play and start time counter
    var ccount = 0;
    $("#play-pause-button").click(function(e) {
        ccount ++;
        if (ccount % 2 == 0) {
            clearInterval(timeUpdate);
        } else {
            updateTime(0,0,0,0);
        }
    });

    // Loss test control
    $("body").on('DOMSubtreeModified', "#loss-test", function(e) {
        // get test loss data
        let loss_test = $(this).text();
        // set limit
        if (loss_test === '0.001') {
            // pause/stop training
            $('#play-pause-button').click();
        }
    });
    
    // Loss train control
    $("body").on('DOMSubtreeModified', "#loss-train", function(e) {
        // get test loss data
        let loss_train = $(this).text();
        // set limit
        if (loss_train === '0.001') {
            // pause/stop training
            $('#play-pause-button').click();
        }
    });
})(jQuery);