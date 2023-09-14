// 定义一个数组，用于存储每个单元格的状态，初始值都为空字符串
let cells = ["", "", "", "", "", "", "", "", ""];

// 定义一个变量，用于记录当前轮到哪个玩家，初始值为圈（◯）
let turn = "◯";

let item  = false
// 定义一个函数，用于处理单元格被点击的事件
async function clickCell(index) {
    // 取被点击的单元格对应的按钮元素
    const button = document.getElementById("cell_" + index);
    if (item){
        gameEnd(turn);
        return
    }
    // 判断该单元格是否已经被占用，如果是，则不做任何操作，如果否，则继续
    if (cells[index] === "") {
        // 将当前玩家的符号显示在按钮上
        button.innerHTML = turn;

        // 将当前玩家的符号存储到数组中
        cells[index] = turn;

        // 判断当前玩家是否已经赢得游戏，如果是，则弹出提示框，并结束游戏，如果否，则继续
         if (checkWin(turn)) {
            // alert(turn + "赢了！");
             gameEnd(turn);
             return;
        }

        // 判断是否已经没有空闲的单元格，如果是，则弹出提示框，并结束游戏，如果否，则继续
        if (checkDraw()) {
            alert("平局！");
            gameStart();
            return;
        }

        // 切换到另一个玩家
        switchTurn();
    }
}

// 定义一个函数，用于判断某个玩家是否已经赢得游戏
function checkWin(symbol) {
    // 定义一个二维数组，用于存储所有可能的连线方式
    const lines = [
        [0, 1, 2], // 横线
        [3, 4, 5], // 横线
        [6, 7, 8], // 横线
        [0, 3, 6], // 竖线
        [1, 4, 7], // 竖线
        [2, 5, 8], // 竖线
        [0, 4, 8], // 斜线
        [2, 4, 6]  // 斜线
    ];

    // 遍历所有可能的连线方式，判断是否有一条线上的三个单元格都是某个玩家的符号，如果是，则返回真值，如果否，则继续
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (cells[line[0]] == symbol && cells[line[1]] == symbol && cells[line[2]] == symbol) {
            return true;
        }
    }

    // 如果没有找到任何连线方式，返回假值
    return false;
}

// 定义一个函数，用于判断是否已经没有空闲的单元格
function checkDraw() {
    // 遍历所有单元格，判断是否有空闲的单元格，如果有，则返回假值，如果没有，则继续
    for (let i = 0; i < cells.length; i++) {
        if (cells[i] == "") {
            return false;
        }
    }

    // 如果没有找到任何空闲的单元格，返回真值
    return true;
}

// 定义一个函数，用于切换到另一个玩家
function switchTurn() {
    // 判断当前轮到哪个玩家，如果是圈（◯），则切换到叉（✗），如果是叉（✗），则切换到圈（◯）
    if (turn === "◯") {
        turn = "✗";
    } else {
        turn = "◯";
    }
}
function gameStart(){
    for (let i = 0; i < 9 ; i++) {
        const content = document.getElementById("cell_" + i);
        content.innerHTML = "";
    }
    cells = ["", "", "", "", "", "", "", "", ""];
    turn = "◯";
}

function gameEnd(winner) {
    // Create the div element
    const div = document.createElement("div");
    div.className = "custom-div";


// Create the restart button
    const restartButton = document.createElement("button");
    restartButton.className = "restart-button";
    restartButton.textContent = "Restart";
    restartButton.addEventListener("click", function() {
        document.body.removeChild(div);
        item = false
        gameStart();
    });

// Create the pause button
    const pauseButton = document.createElement("button");
    pauseButton.className = "pause-button";
    pauseButton.textContent = "Pause";
    pauseButton.addEventListener("click", function() {
        document.body.removeChild(div);
        item = true
    });

    const text = document.createElement("h4");
    text.textContent = " congratulation!!! player " + winner

// Append the buttons to the div
    div.appendChild(restartButton);
    div.appendChild(pauseButton);
    div.appendChild(text)

// Append the div to the body
    document.body.appendChild(div);
}