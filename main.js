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
const DEFAULT_BOARD_SIZE = 8;

// data model at global scope for easier debugging
var board;
var rules;
const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

// initialize board
// if ($.getUrlVar("size") && $.getUrlVar("size") >= 3) {
// board = new Board($.getUrlVar("size"));
// } else {
board = new Board(DEFAULT_BOARD_SIZE);
// }
let allCandies = {}; // All candies gets hoisted to the key press funcs

$(document).ready(function () {
  renderBoard();

  $(board).on("add", function (e, info) {
    setCellColors(info);
  });
  // When start button is clicked
  $("#start-btn").click(() => {
    // Show the third column
    let thirdCol = $(".column.c3");
    let pointsPara = $("#pointsPara");
    thirdCol.css({ display: "flex" });
    pointsPara.css({ display: "block" });
  });

  // When crush button is pressed
  $(".crush-btn").click(() => {
    let thirdCol = $(".column.c3");

    // Prevent users from using any arrows
    thirdCol.css({ pointerEvents: "none", opacity: "0.4" });

    setTimeout(function () {
      rules.moveCandiesDown();
        
      // Allow the user to use the arrows again
      thirdCol.css({ pointerEvents: "auto", opacity: "1" });
    }, 1500);

    rules.removeCrushes(rules.getCandyCrushes());
  });

  // When crush button is pressed
  $(".crush-btn").click(() => {
    setTimeout(function () {
      rules.moveCandiesDown();
    }, 1000);

    rules.removeCrushes(rules.getCandyCrushes());
  });
  rules = new Rules(board);
  rules.prepareNewGame();

  // #region Arrow Button Listers
  $(".arrow.ar-up").click(() => {
    handleArrowPress("up", board);
  });
  $(".arrow.ar-down").click(() => {
    handleArrowPress("down", board);
  });
  $(".arrow.ar-left").click(() => {
    handleArrowPress("left", board);
  });
  $(".arrow.ar-right").click(() => {
    handleArrowPress("right", board);
  });
  //#endregion
});

// #region Arrow Key Listeners
//  Listener for left arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 37) {
    handleArrowPress("left", board);
  }
});

//  Listener for right arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 39) {
    handleArrowPress("right", board);
  }
});

//  Listener for up arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 38) {
    handleArrowPress("up", board);
  }
});

//  Listener for down arrow key
$(document).keydown(function (e) {
  if (e.keyCode == 40) {
    handleArrowPress("down", board);
  }
});

// move a candy on the board
$(board).on("move", function (e, info) {
  //jquery grab element
  const candy = info.candy;
  const { col, row } = candy; // destructure the vars
  const candyElement = $(`.candy.${col}${row}`);

  //jquery change background color
  candyElement.css({ backgroundColor: candy });
});

// remove a candy from the board
$(board).on("remove", function (e, info) {});

// move a candy on the board
$(board).on("scoreUpdate", function (e, info) {
  // Your code here. To be implemented in pset 2.
});

const renderBoard = () => {
  // Creates the grid
  for (let i = 1; i <= 8; i++) {
    $(".grid").append(`<td class='tr${i}'></td>`);
    for (let j = 1; j <= 8; j++) {
      $(`.tr${i}`).append(`<td class='candy ${i - 1}${j - 1}'>
      <span>${letters[i - 1]}${j}</span>
      </td>`);
    }
  }
};

const setCellColors = (info) => {
  const candy = info.candy;
  const { col, row } = candy; // destructure the vars
  const cell = $(`.candy.${col}${row}`);

  cell.css({ backgroundColor: candy });
  if (candy == "yellow") {
    cell.css({ color: "black" });
  }
  allCandies[`${letters[col]}${row + 1}`] = info; // Store all candy in a single object
};

const handleArrowPress = (arrowDirection, board) => {
  // get the last character of a string
  let move = $(".move-input").val();
  let currentCandy = allCandies[move];
  let firstChar = move.charAt(0);
  let lastChar = parseInt(move.charAt(move.length - 1)); // to get sibling cut off the last char and inc or dec
  let infoObject = allCandies[move];

  // Get left right up down candies
  let downCandy = allCandies[`${firstChar}${incNum(lastChar)}`];
  let upCandy = allCandies[`${firstChar}${decNum(lastChar)}`];
  let rightCandy = allCandies[`${incChar(firstChar)}${lastChar}`];
  let leftCandy = allCandies[`${decChar(firstChar)}${lastChar}`];

  switch (arrowDirection) {
    case "left":
      rules.isMoveTypeValid(infoObject.candy, "left") ? board.flipCandies(currentCandy.candy, leftCandy.candy) : console.log("invalid");
      break;
    case "right":
      rules.isMoveTypeValid(infoObject.candy, "right") ? board.flipCandies(currentCandy.candy, rightCandy.candy) : console.log("invalid");
      break;
    case "up":
      rules.isMoveTypeValid(infoObject.candy, "up") ? board.flipCandies(currentCandy.candy, upCandy.candy) : console.log("invalid");
      break;
    case "down":
      rules.isMoveTypeValid(infoObject.candy, "down") ? board.flipCandies(currentCandy.candy, downCandy.candy) : console.log("invalid");
      break;
  }
};
const getLastChar = (str) => parseInt(str.slice(-1));

const incNum = (num) => {
  let result = parseInt(num) + 1;
  return result >= 9 ? 0 : result;
};
const decNum = (num) => {
  let result = parseInt(num) - 1;
  return result <= 0 ? 7 : result;
};

const incChar = (c) => {
  let next = String.fromCharCode(c.charCodeAt(0) + 1);
  return next === "i" ? "a" : next;
};
const decChar = (c) => {
  if (c === "a") {
    return "h";
  } else {
    return String.fromCharCode(c.charCodeAt(0) - 1);
  }
};
