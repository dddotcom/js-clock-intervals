document.addEventListener("DOMContentLoaded", function() {

  var oneSecond = 1000;
  var oneMinute = oneSecond * 60;
  var oneHour = oneMinute * 60;

  // locate DOM elements
  var secondHand = document.getElementById("second");
  var minuteHand = document.getElementById("minute");
  var hourHand = document.getElementById("hour");

  // get current time and update variables
  var now = new Date();
  var hourCounter = now.getHours()%12; // returns number between 0 and 23
  minuteCounter = now.getMinutes(); // returns number between 0 and 59
  secondCounter = now.getSeconds(); // returns number between 0 and 59
  console.log(hourCounter + ":" + minuteCounter + ":" + secondCounter);

  // move seconds
  var oneSecondInterval = setInterval(moveSecondHand, oneSecond);

  // account for minute offset
  var minuteTimeoutDelay = (60 - now.getSeconds())*oneSecond;
  console.log(minuteTimeoutDelay);
  setTimeout(moveMinuteHand, minuteTimeoutDelay);
  setTimeout(function() {
    setInterval(moveMinuteHand, oneMinute);
  }, minuteTimeoutDelay);

  // account for hour offset
  var hourTimeoutDelay = ((60 - now.getMinutes())*oneMinute) - now.getSeconds()*oneSecond;
  console.log(hourTimeoutDelay);
  setTimeout(moveHourHand, hourTimeoutDelay);
  setTimeout(function() {
    setInterval(moveHourHand, oneHour);
  }, hourTimeoutDelay)

  // set the clock
  moveSecondHand();
  moveMinuteHand();
  moveHourHand();

  // move hand functions
  function moveSecondHand() {
    // calculate degrees to rotate
    secondHandDegrees = (secondCounter/60)*360;
    secondHand.style.transform = "rotate(" + secondHandDegrees + "deg)";
    if(secondCounter <59){
      secondCounter++;
    } else { // else reset secondCounter to 0
      secondCounter = 0;
    }
  }

  function moveMinuteHand() {
    // calculate degrees to rotate
    minuteHandDegrees = (minuteCounter/60)*360;
    minuteHand.style.transform = "rotate(" + minuteHandDegrees + "deg)";

    // increment minuteCounter if it is <59
    if(minuteCounter < 59){
      minuteCounter++;
    } else { // else reset minuteCounter to 0
      minuteCounter = 0;
    }
  }

  function moveHourHand() {
    // calculate degrees to rotate
    hourHandDegrees = (hourCounter/12)*360;
    hourHand.style.transform = "rotate(" + hourHandDegrees + "deg)";

    // increment hourCounter if it is <11
    if(hourCounter < 11){
      hourCounter++;
    } else { // else reset hourCounter to 0
      hourCounter = 0;
    }
  }

});
