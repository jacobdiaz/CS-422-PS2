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

$(document).ready(function () {
  generateBoard();
  $(board).on("add", function (e, info) {
    setCellColors(info);
  });
  console.log(allCandies);
  rules = new Rules(board);
  rules.prepareNewGame();

  // When start button is clicked
  $("#start-btn").click(() => {
    console.log("start button clicked");
  });

  // #region Arrow Button Listers
  $(".arrow.ar-up").click(() => {
    handleArrowPress("up");
  });
  $(".arrow.ar-down").click(() => {
    handleArrowPress("down");
  });
  $(".arrow.ar-left").click(() => {
    handleArrowPress("left");
  });
  $(".arrow.ar-right").click(() => {
    handleArrowPress("right");
  });
  //#endregion
});

// #region Arrow Key Listeners
//  Listener for up arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 37) {
    handleArrowPress("up");
  }
});

//  Listener for down arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 39) {
    handleArrowPress("down");
  }
});

//  Listener for left arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 38) {
    handleArrowPress("left");
  }
});

//  Listener for right arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 40) {
    handleArrowPress("right");
  }
});

// move a candy on the board
$(board).on("move", function (e, info) {});

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

let allCandies = {}; // All candies gets hoisted to the key press funcs

const setCellColors = (info) => {
  const candy = info.candy;
  const { col, row } = candy; // destructure the vars
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

  // Set the color
  $(`.candy.${row}${col}`).css({ backgroundColor: candy });
  allCandies[`${letters[row]}${col + 1}`] = info; // Store all candy in a single object
};

const handleArrowPress = (arrowDirection) => {
  let move = $(".move-input").val();
  let infoObject = allCandies[move];
  switch (arrowDirection) {
    case "left":
      console.log(infoObject.candy);
      rules.isMoveTypeValid(infoObject.candy, "left") ? console.log("valid") : console.log("invalid");
      break;
    case "right":
      console.log(infoObject.candy);
      rules.isMoveTypeValid(infoObject.candy, "right") ? console.log("valid") : console.log("invalid");
      break;
    case "up":
      console.log(infoObject.candy);
      rules.isMoveTypeValid(infoObject.candy, "up") ? console.log("valid") : console.log("invalid");
      break;
    case "down":
      console.log(infoObject.candy);
      rules.isMoveTypeValid(infoObject.candy, "down") ? console.log("valid") : console.log("invalid");
      break;
  }
};
