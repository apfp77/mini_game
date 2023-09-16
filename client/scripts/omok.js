const lineCount = 17;
const boardEndToLineDistance = 50;
const maxSize = 850;
const svg = document.getElementById("game-board");
const stonesGroup = document.getElementById("stones");
const svgNamespace = "http://www.w3.org/2000/svg";
const arr = Array.from(Array(lineCount + 1), () =>
  Array(lineCount + 1).fill(0)
);
let check = false;
let gameState = false;

function heightGameState(idxX, idxY, player) {
  let cnt = 1;
  let idxYTop = idxY - 1;
  let idxYBottom = idxY + 1;
  while (idxYTop >= 0) {
    if (arr[idxYTop][idxX] !== player) break;
    cnt++;
    idxYTop--;
  }

  while (idxYBottom < lineCount) {
    if (arr[idxYBottom][idxX] !== player) break;
    cnt++;
    idxYBottom++;
  }
  if (cnt === 5) {
    this.gameState = true;
  }
}

function widthGameState(idxX, idxY, player) {
  let cnt = 1;
  let idxXLeft = idxX - 1;
  let idxXRight = idxX + 1;
  while (idxXLeft >= 0) {
    if (arr[idxY][idxXLeft] !== player) break;
    cnt++;
    idxXLeft--;
  }

  while (idxXRight < lineCount) {
    if (arr[idxY][idxXRight] !== player) break;
    cnt++;
    idxXRight++;
  }
  if (cnt === 5) {
    this.gameState = true;
  }
}

function diagonalSlash(idxX, idxY, player) {
  let cnt = 1;
  let idxXLeft = idxX - 1;
  let idxYLeft = idxY + 1;
  let idxXRight = idxX + 1;
  let idxYRight = idxY - 1;

  while (idxXLeft >= 0 && idxYLeft < lineCount) {
    if (arr[idxYLeft][idxXLeft] !== player) break;
    idxXLeft--;
    idxYLeft++;
    cnt++;
  }
  while (idxXRight < lineCount && idxYRight >= 0) {
    if (arr[idxYRight][idxXRight] !== player) break;
    idxXRight++;
    idxYRight--;
    cnt++;
  }
  if (cnt == 5) {
    this.gameState = true;
  }
}

function diagonalEscape(idxX, idxY, player) {
  let cnt = 1;
  let idxXLeft = idxX - 1;
  let idxYLeft = idxY - 1;
  let idxXRight = idxX + 1;
  let idxYRight = idxY + 1;

  while (idxXLeft >= 0 && idxYLeft >= 0) {
    if (arr[idxYLeft][idxXLeft] !== player) {
      break;
    }
    idxXLeft--;
    idxYLeft--;
    cnt++;
  }
  while (idxXRight < lineCount && idxYRight < lineCount) {
    if (arr[idxYRight][idxXRight] !== player) break;
    idxXRight++;
    idxYRight++;
    cnt++;
  }
  if (cnt == 5) {
    this.gameState = true;
  }
}

function diagonalGameState(idxX, idxY, player) {
  // /
  diagonalSlash(idxX, idxY, player);
  // \
  diagonalEscape(idxX, idxY, player);
}

function drawLine(x1, y1, x2, y2) {
  const line = document.createElementNS(svgNamespace, "line");

  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "black"); // 선 색상
  line.setAttribute("stroke-width", "2"); // 선 두께

  svg.appendChild(line);
}

function drawStone(x, y, color) {
  return new Promise((resolv) => {
    const stone = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    stone.setAttribute("cx", x);
    stone.setAttribute("cy", y);
    stone.setAttribute("r", 20); // 바둑알 반지름
    stone.setAttribute("class", "stone");

    stone.setAttribute("fill", color);
    stonesGroup.appendChild(stone);
    resolv();
  });
}

svg.addEventListener("click", async (event) => {
  if (this.gameState) return;
  if (
    svg.getBoundingClientRect().right - event.clientX <
      boardEndToLineDistance ||
    event.clientX - svg.getBoundingClientRect().left < boardEndToLineDistance
  )
    return;
  if (
    svg.getBoundingClientRect().bottom - event.clientY <
      boardEndToLineDistance ||
    event.clientY - svg.getBoundingClientRect().top < boardEndToLineDistance
  )
    return;
  let x = event.clientX - svg.getBoundingClientRect().left;
  let y = event.clientY - svg.getBoundingClientRect().top;
  const checkX = (x % boardEndToLineDistance) - 25;
  const checkY = (y % boardEndToLineDistance) - 25;

  if (checkX <= 0) {
    x = x - (x % boardEndToLineDistance);
  } else {
    x = x + boardEndToLineDistance - (x % boardEndToLineDistance);
  }
  if (checkY <= 0) {
    y = y - (y % boardEndToLineDistance);
  } else {
    y = y + boardEndToLineDistance - (y % boardEndToLineDistance);
  }
  const color = check === true ? "white" : "black";
  const player = check === true ? 2 : 1;
  const idxY = y / boardEndToLineDistance - 1;
  const idxX = x / boardEndToLineDistance - 1;
  if (arr[idxY][idxX] === 0) {
    arr[idxY][idxX] = player;
    check = !check;
    await drawStone(x, y, color);
    widthGameState(idxX, idxY, player);
    heightGameState(idxX, idxY, player);
    diagonalGameState(idxX, idxY, player);
  }
});

// 세로 선
for (
  let i = boardEndToLineDistance;
  i <= maxSize;
  i += boardEndToLineDistance
) {
  drawLine(boardEndToLineDistance, i, maxSize, i);
}
// 가로 선
for (
  let i = boardEndToLineDistance;
  i <= maxSize;
  i += boardEndToLineDistance
) {
  drawLine(i, boardEndToLineDistance, i, maxSize);
}
