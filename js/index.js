// variables

userSeq = [];
ingramSeq = [];
const NUM_OF_LEVELS = 10;
var id,
  color,
  level = 0;
var strict = false;
var error = false;
var boardSound = [
  "http://www.soundjay.com/button/sounds/button-4.mp3", //green
  "http://www.soundjay.com/button/sounds/button-09.mp3", //red
  "http://www.soundjay.com/button/sounds/button-10.mp3", //yellow
  "http://www.soundjay.com/button/sounds/button-7.mp3" //blue
];

//  start board sequence
$(document).ready(function() {
  $(".start").click(function() {
    start();
  });

  //   user pad listener
  $(".pad").click(function() {
    id = $(this).attr("id");
    color = $(this).attr("class").split(" ")[1];
    userSequence();
  });

  $(".strict").click(function() {
      $(".display").text("--");
      $(".hood").css("display","block");
    if (!strict) {
      $(".indicator").css("background-color","red");
      strict = true;
    } 
    else if (strict) {
      $(".indicator").css("background-color","black");
      strict = false;
    }
    initialize();
    
  
  });
  
  
});

// initialize arrays/reset game 
function initialize(){
 level = 0;
  level++;
  ingramSeq = [];
  userSeq = [];
  error = false;
}

function start(){
  initialize();
  $(".display").text(level)
  $(".hood").css("display", "none");
  ingramSequence();
}

//     user sequence
function userSequence(){
      userSeq.push(id);
      addClassSound(id);

      // check user sequence
      if (!checkUserSeq()) {
        if (strict) {
          ingramSeq = [];
          level = 1;
        }
        error = true;
      displayError();
      userSeq = [];
      ingramSequence();
      }
      
        //     check end sequence
    else if (userSeq.length == ingramSeq.length && userSeq.length < NUM_OF_LEVELS) {
      level++;
      userSeq = [];
      error = false;
      ingramSequence();
    }
      
      //     check for winner
         if (userSeq.length == NUM_OF_LEVELS) {
      $(".display").text("Win");
      showTime(); 
      $(".hood").css("display", "block");
           var i = 5;
           setTimeout(function(){
             var resetGame = setInterval (function(){
               initialize();
               $(".display").text(i);
               i--;
               if(i < 0){
                 $(".display").text("--");
               }
               if(i < -1){
                 start();
                 clearInterval(resetGame);
               }
             }, 1000); 
    },3000);

}
    }
   
// check user sequence against ingram
function checkUserSeq() {
  for (var i = 0; i < userSeq.length; i++) {
    if (userSeq[i] != ingramSeq[i]) {
      return false;
    }
  }

  return true;
}

// display error
function displayError() {
  var counter = 0;
  var myError = setInterval(function() {
    $(".display").text("***");
    counter++;
    if (counter == 3) {
      $(".display").text(level);
      clearInterval(myError);
      userSeq = [];
      counter = 0;
    }
  }, 500);
}

// light up function after winning 
//  function showTime(){
//   var colorWheel = [0, 1, 3, 2];
//    var i = 0;
//    var n = 0;
//    var myInterval = setInterval(function(){
//      if(n>3){
//        n = 0;
//      }
//      color = $("#"+colorWheel[n]).attr("class").split(" ")[1];
//      setTimeout (function(){
//        $("#"+colorWheel[n-1]).removeClass(color+"-active");
//      }, 75);
//      i++;
//      n++;
//      if(i == 4*6){
//       clearInterval(myInterval);
//      }
//    }, 115);
  
//  }
 function showTime() {
   var colorWheel = [0,1,3,2];
   var i = 0;
   var n = 0;
   var myInterval = setInterval(function() {
       if (n>3) {
         n = 0;
       }
       color = $("#"+colorWheel[n]).attr("class").split(" ")[1];
       $("#"+colorWheel[n]).addClass(color+"-active");
       setTimeout (function() {
           $("#"+colorWheel[n-1]).removeClass(color+"-active");
         }, 75);
       i++;
       n++;
       if (i == 4*6) {
         clearInterval(myInterval);
       }
     }, 115);
 }

// ingram sequence
function ingramSequence() {
  $(".hood").css("display", "block");
  $(".display").text(level);
  if(!error){
  getRandomNum();
  }
  if (error && strict) {
     getRandomNum();
  }
  var i = 0;
  var wait = 1000;
  if (level > 5){
    wait = 800;
  }else if (level > 10){
    wait = 700;
  }else if (level > 15){
    wait = 600;
  }
  var myInterval = setInterval(function() {
    id = ingramSeq[i];
    color = $("#" + id).attr("class").split(" ")[1];
    addClassSound(id, color);
    i++;
    if (i == ingramSeq.length) {
      clearInterval(myInterval);
    }
  }, wait);
  setTimeout(function(){
    $(".hood").css("display", "none");
  }, wait*level);
}

// generate random number

function getRandomNum() {
  var random = Math.floor(Math.random() * 4);
  ingramSeq.push(random);
}

// add temporary class and sound
function addClassSound(id, color) {
  $("#" + id).addClass(color + "-active");
  playSound(id);
  setTimeout(function() {
    $("#" + id).removeClass(color + "-active");
  }, 500);
}

// play board sound

function playSound(id) {
  var sound = new Audio(boardSound[id]);
  sound.play();
}


