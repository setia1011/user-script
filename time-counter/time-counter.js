$(function() {
    
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
    updateTime(0,0,0,0);
    // Pause
    // clearInterval(timeUpdate);
    // Resume
    // updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds);
    // Reset
    // setStopwatch(0,0,0,0);

    
    // Update time in stopwatch periodically - every 25ms
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

            // console.log(milliseconds);
            // if (milliseconds > 100) {
            //     clearInterval(timeUpdate);
            // }
            
        }, 1); // update time in stopwatch after every 25ms
        
    }
    
    // Set the time in stopwatch
    function setStopwatch(hours, minutes, seconds, milliseconds){
        // prependZero(hours, 2);
        // prependZero(minutes, 2);
        // prependZero(seconds, 2);
        // prependZero(milliseconds, 3);
        $("#hours").html(prependZero(hours, 2));
        $("#minutes").html(prependZero(minutes, 2));
        $("#seconds").html(prependZero(seconds, 2));
        $("#milliseconds").html(prependZero(milliseconds, 3));
    }
    
    // Prepend zeros to the digits in stopwatch
    function prependZero(time, length) {
        time = new String(time); // stringify time
        return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
    }

    clearInterval(0);

});