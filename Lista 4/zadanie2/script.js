var _width;
var _total;
var _mines;

var exposed = new Array();
var exposedEnd = -1;
var incorrectFlag = -2;
var exploded = -3;
var unexposed = -4;                 // nieodkryty (domyślny)
var flagged = -5;                   // marked
var queried = -6;                   // podejrzany

var adjacent = new Array();
var mine = 9;                       // ilość sąsiadów oznaczająca minę

var charFlag = "+";
var charQuestion = "?";
var charMine = "*";
var charIncorrect = "x";
var minesNumColor = ["#000000", "#0000ff", "#004f00", "#ff0000",
    "#660066", "#006666", "#000000", "#000000", "#000000"];

var erasing = 0;
var sad = 1;
var neutral = 2;
var happy = 3;

var flags = 0;
var remainingMines = 0;
var tail = exposedEnd;
var sadness = happy;
var startTime;
var timer = false;

function updateMines() {
    var element = document.getElementById("mines");
    element.innerHTML = _mines - flags;
}

function writeTime() {
    var element = document.getElementById("timer");
    if (timer) {
        var currTime = new Date();
        element.innerHTML = Math.floor((currTime.getTime() - startTime.getTime())/1000);
    } else {
        element.innerHTML = "&nbsp;";
    }
}

function updateSmiley() {
    var smiley = document.getElementById("smiley");
    if (sadness == erasing)
        smiley.src = "img/neutral.gif";
    else if (sadness == sad)
        smiley.src = "img/dead.gif";
    else if (sadness == neutral)
        smiley.src = "img/neutral.gif";
    else
        smiley.src = "img/happy.gif";
}

function updateCell(cellId) {
    // update square display, based on "exposed" and "adjacent"
    var cell = document.getElementById("cell" + cellId);
    var exp = exposed[cellId];
    var s;
    if (exp <= unexposed) {
        if (exp == unexposed) {
            s = "&nbsp;";
        } else if (exp == flagged) {
            s = charFlag;
        } else {
            s = charQuestion;
        }
        cell.innerHTML = s;
        cell.style.backgroundColor = "#cccccc";
        cell.style.borderColor = "#eeeeee #999999 #999999 #eeeeee";
        cell.style.color = "#006600";
        cell.style.cursor = "pointer";
    } else {
        var adj = adjacent[cellId];
        var c = "#000000";
        if (exp == exploded) {
            s = charMine;
            c = "#ff0000";
        } else if (exp == incorrectFlag) {
            s = charIncorrect;
            c = "#ff0000";
        } else if (adj == mine) {
            s = charMine;
        } else if (adj == 0) {
            s = "&nbsp;";
        } else {
            s = "" + adj;
            c = minesNumColor[adj];
        }
        cell.innerHTML = s;
        cell.style.backgroundColor = "#bbbbbb";
        cell.style.borderColor = "#bbbbbb";
        cell.style.color = c;
        cell.style.cursor = "default";
    }
}

function timerAction() {
    if (timer) {
        writeTime();
        setTimeout("timerAction()", 300);
    }
}

function startTimer() {
    startTime = new Date();
    timer = true;
    timerAction();
}

function endGame(outcome) {
    timer = false;
    sadness = outcome;
    updateSmiley();
}

function applyToNeighbours(cellId, funct) {
    var x = cellId % _width;
    if (cellId >= _width) { // there's a row above
        if (x > 0) funct(cellId - _width - 1);
        funct(cellId - _width);
        if (x+1 < _width) funct(cellId - _width + 1);
    }
    if (x > 0) funct(cellId - 1);
    if (x+1 < _width) funct(cellId + 1);
    if (cellId < _total-_width) { // there's a row below
        if (x > 0) funct(cellId + _width - 1);
        funct(cellId + _width);
        if (x+1 < _width) funct(cellId + _width + 1);
    }
}

function exposeCell(cellId) {
    if (exposed[cellId] <= unexposed && exposed[cellId] != flagged) {
        remainingMines--;
        exposed[cellId] = exposedEnd;
        exposed[tail] = cellId;
        tail = cellId;
        updateCell(cellId);
    }
}

function clickCell(event, cellId) {
    if (sadness != neutral) // Koniec gry
        return false;
    if (!timer)
        startTimer();
    if (exposed[cellId] > unexposed) {
        // pass
    }
    else if (event.shiftKey || event.button == 2) {
        // flagowanie
        var i;
        var exp = exposed[cellId];
        if (exp == unexposed) {
            exposed[cellId] = flagged;
            flags++;
            updateMines();
        } else if (exp == flagged) {
            exposed[cellId] = queried;
            flags--;
            updateMines();
        } else if (exp == queried) {
            exposed[cellId] = unexposed;
        }
        updateCell(cellId);
    } else if (adjacent[cellId] == mine) {
        // wybuch bomby
        remainingMines--;
        exposed[cellId] = exploded;
        updateCell(cellId);
        for (i = 0; i < _total; i++) {
            if (i==cellId) {
            } else if (adjacent[i] == mine && exposed[i] != flagged) {
                remainingMines--;
                exposed[i] = exposedEnd;
                updateCell(i);
            } else if (adjacent[i] != mine && exposed[i] == flagged) {
                remainingMines--;
                exposed[i] = incorrectFlag;
                updateCell(i);
            }
        }
        endGame(sad);
    } else {
        // odkrywanie
        if (exposed[cellId] == flagged) {
            flags--;
            updateMines();
        }
        remainingMines--;
        exposed[cellId] = exposedEnd;
        tail = cellId;
        updateCell(cellId);
        var current = cellId;
        while (current != exposedEnd) {
            if (adjacent[current]==0)
                applyToNeighbours(current, exposeCell);
            current = exposed[current];
        }
        if (remainingMines==_mines) {

            for (i = 0; i < _total; i++) {
                if (adjacent[i] == mine && exposed[i] <= unexposed &&
                    exposed[i] != flagged ) {
                    exposed[i] = flagged;
                    flags++;
                    updateCell(i);
                }
            }
            updateMines();
            endGame(happy);
        }
    }
    return false;
}

function neighbourIsMine(cellId) {
    if (adjacent[cellId] != mine)
        adjacent[cellId]++;
}

function setMines() {
    var numSet = 0;
    while (numSet < _mines) {
        var target = Math.floor(Math.random() * _total);
        if (target < _total && adjacent[target] != mine) {
            adjacent[target] = mine;
            applyToNeighbours(target, neighbourIsMine);
            numSet++;
        }
    }
}

function eraseRows() {
    for (var i = 0; i < _total; i++) {
        adjacent[i] = 0;
        if (exposed[i] != unexposed) {
            exposed[i] = unexposed;
            updateCell(i);
        }
    }
}

function _erase() {
    eraseRows();
    setMines();
    sadness = neutral;
    updateSmiley();
    return false;
}

function erase() {
    if (sadness != erasing) {
        flags = 0;
        updateMines();
        remainingMines = _total;
        endGame(erasing);
        writeTime();
        setTimeout("_erase()", 1); // aktualizacja smiley'a
    }
}

function clickSmiley(event) {
    if (event.button != 2)
        erase();
    return false;
}

function init(width, height, mines) {
    _width = width;
    _total = _width * height;
    _mines = mines;

    var board = document.getElementById("board");
    board.onselectstart = function() { return false; };

    for (var i = 0; i < _total; i++) {
        var cell = document.getElementById("cell" + i);
        cell.oncontextmenu = function() { return false; };
    }
    erase();
}