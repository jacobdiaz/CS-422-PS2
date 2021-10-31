// By default, the first board loaded by your page will be the same
// each time you load (which is accomplished by "seeding" the random
// number generator. This makes testing (and grading!) easier!
Math.seedrandom(0);

// A short jQuery extension to read query parameters from the URL.
// $.extend({
//   getUrlVars: function () {
//     var vars = [],
//       pair;
//       var pairs = window.location.seaarch.substr(1).split("&");
//     for (var i = 0; i < pairs.length; i++) {
//       pair = pairs[i].split("=");
//       vars.push(pair[0]);
//       vars[pair[0]] = pair[1] && decodeURIComponent(pair[1].replace(/\+/g, " "));
//     }
//     return vars;
//   },
//   getUrlVar: function (name) {
//     return $.getUrlVars()[name];
//   },
// });

// constants
var DEFAULT_BOARD_SIZE = 8;

// data model at global scope for easier debugging
var board;
var rules;

// initialize board
// if ($.getUrlVar("size") && $.getUrlVar("size") >= 3) {
// board = new Board($.getUrlVar("size"));
// } else {
board = new Board(DEFAULT_BOARD_SIZE);
// }

// Final initialization entry point: the Javascript code inside this block
// runs at the end of start-up when the page has finished loading.

$(document).ready(function () {
  console.log("ready");

  generateBoard();
  $(board).on("add", function (e, info) {
    let candy = info.candy;
    let { col, row } = candy; // destructure the vars

    console.log(`${candy} ${col} ${row}`);

    // Set the color
    $(`.candy.${col}${row}`).css({ backgroundColor: candy });
  });

  rules = new Rules(board);
  rules.prepareNewGame();

  // When start button is clicked
  $("#start-btn").click(() => {
    console.log("start button clicked");
  });
});

// #region Key Listeners
//  Listener for left arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 37) {
    let move = $(".move-input").val();
    console.log(move);
    rules.isMoveTypeValid(move, "left") ? console.log("valid") : console.log("invalid");
  }
});

//  Listener for right arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 39) {
    let move = $(".move-input").val();
    console.log(move);
    rules.isMoveTypeValid(move, "right") ? console.log("valid") : console.log("invalid");
  }
});

//  Listener for up arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 38) {
    let move = $(".move-input").val();
    console.log(move);
    rules.isMoveTypeValid(move, "up") ? console.log("valid") : console.log("invalid");
  }
});

//  Listener for down arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 40) {
    let move = $(".move-input").val();
    console.log(move);
    rules.isMoveTypeValid(move, "down") ? console.log("valid") : console.log("invalid");
  }
});

//#endregion

// move a candy on the board
$(board).on("move", function (e, info) {
  // Your code here.
});

// remove a candy from the board
$(board).on("remove", function (e, info) {
  // Your code here.
});

// move a candy on the board
$(board).on("scoreUpdate", function (e, info) {
  // Your code here. To be implemented in pset 2.
});

const generateBoard = () => {
  // Creates the grid
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  for (let i = 1; i <= 8; i++) {
    $(".grid").append(`<td class='tr${i}'></td>`);
    for (let j = 1; j <= 8; j++) {
      $(`.tr${i}`).append(`<td class='candy ${i - 1}${j - 1}'>${letters[i - 1]}${j}</td>`);
    }
  }
};
