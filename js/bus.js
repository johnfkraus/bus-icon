/* demo script to change bus icons periodically */

// returns a pseudo-random integer between 0 and less than max
function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * Math.floor(max));
}

// crash sequence
function busSwitcher2() {
  changeBusIcon2("#34");
}

function busSwitcher3() {
  // randomly select one of the items in the table by grid location
  // and id of #23 means row 2 column 3
  let col = getRandomInt(4);
  let row = getRandomInt(4);
  let busId = "#" + row + col;
  // console.log("busId = " + busId);
  // busId 34 is the sole crashing bus; busId 43 is the only slow bus; this method doesn't run them.
  if (busId == "#34" || busId == "#43") {
    console.log("skipping " + busId);
  } else {
    changeBusIcon1(busId);
  }
}

// rotate icons between still/ready and running, and the completed check icon
// ready (still bus image) -> running (animated bus) -> Completed (check mark); then repeat
// bus id param is a string starting with '#'; for example, '#21';
function changeBusIcon1(busId) {
  let checkId = "#i" + busId.slice(-2);
  console.log('line 45 running changeBusIcon busId = ' + busId);
  let src = $(busId).attr("src");
  console.log("line 47 busId = " + busId + ", src = " + src);
  if (!$(busId).hasClass("hidden")) {
    $(checkId).addClass("hidden");
    if (src.indexOf("still") >= 0) {
      $(checkId).addClass("hidden");
      $(busId).attr("src", "images/bus-running207x94.gif");
      $(busId).attr("title", "Running");
    } else if (src.indexOf("running") >= 0) {
      $(busId).attr("src", "");
      toggleVisibility(busId);
    }
  } else {
    toggleVisibility(busId);
    $(checkId).addClass("hidden");
    // the still bus image represents the ready state
    $(busId).attr("src", "images/bus-still207x94.gif");
    $(busId).attr("title", "Ready");
  }
}

// rotate icons between still, running and crashing
// still/read -> running -> crashing; then repeat
// bus id param is a string starting with '#'; for example, '#21';
function changeBusIcon2(busId) {
  let checkId = "#i" + busId.slice(-2);
  $(checkId).addClass("hidden");
  console.log('running changeBusIcon2 busId = ' + busId);
  let src = $(busId).attr("src");
  // hideCheckShowBus(busId);
  if (src.indexOf("still") >= 0) {
    $(checkId).addClass("hidden");
    $(busId).attr("src", "images/bus-running207x94.gif");
    $(busId).attr("title", "Running");
  } else if (src.indexOf("running") >= 0) {
    $(checkId).addClass("hidden");
    // console.log(src.indexOf("running" >= 0));
    $(busId).attr("src", "images/bus-crashing498x312.gif");
    $(busId).attr("title", "Fail");
  } else if (src.indexOf("crashing") >= 0) {
    $(checkId).addClass("hidden");
    $(busId).attr("src", "images/bus-still207x94.gif");
    $(busId).attr("title", "Ready");
  }

}

function agentDone(busId) {
  $("#busId").remove();
  let outerElement = "div" + busId;
  let iconElement = "<i id='\"" + busId + "\" class=\"fas fa-check fa-4x\"></i>";
  console.log("outerElement = " + outerElement);
  console.log("iconElement = " + iconElement);
  $(outerElement).append(iconElement);

}

function hideCheckShowBus(busId) {
  let checkId = "#i" + busId.slice(-2);
  $(busId).removeClass("hidden");
  $(checkId).addClass("hidden");
}

function toggleVisibility(busId) {
  let checkId = "#i" + busId.slice(-2);
  if ($(busId).hasClass("hidden")) {
    console.log("Bus " + busId + " is hidden, changing to visible; check becomes hidden");
    $(busId).removeClass("hidden");
    $(checkId).addClass("hidden");
  } else {
    console.log("Bus " + busId + " is visible, changing to hidden; check becomes visible");
    $(checkId).removeClass("hidden");
    $(busId).addClass("hidden");
  }
}

function abortTimer() { // to be called when you want to stop the timers
  clearInterval(tid3);
  clearInterval(tid5);
}

$( document ).tooltip({
  show: { effect: "blind", duration: 800 },
  hide: { effect: "puff", duration: 1000 },
  position: {my: "left-25 bottom",
    at: "center"
  }
});

let tid3, tid5;
$(function () {
  abortTimer();
  // runs all buses except the crashing bus and slow bus
  tid3 = setInterval(busSwitcher2, 3500);
  // runs the crashing bus
  tid5 = setInterval(busSwitcher3, 4500);
});