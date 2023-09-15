/*
  요구조건
  1. 클릭은 바둑판 안에서만 가능해야합니다
  2. 동일한 자리에 서로 다른 사람이 바둑알을 놓을 수 없습니다
*/

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
  let idxXTop = idxY;
  let idxXBottom = idxY;
  while (idxXTop >= 0) {
    if (arr[idxXTop - 1][idxX] !== player) break;
    cnt++;
    idxXTop--;
  }

  while (idxXBottom < lineCount) {
    if (arr[idxXBottom + 1][idxX] !== player) break;
    cnt++;
    idxXBottom++;
  }
  if (cnt === 5) {
    this.gameState = true;
  }
  console.log(cnt);
}

function widthGameState(idxX, idxY, player) {
  let cnt = 1;
  let idxXLeft = idxX;
  let idxXRight = idxX;
  while (idxXLeft >= 0) {
    if (arr[idxY][idxXLeft - 1] !== player) break;
    cnt++;
    idxXLeft--;
  }

  // 가로 오른쪽
  while (idxXRight < lineCount) {
    if (arr[idxY][idxXRight + 1] !== player) break;
    cnt++;
    idxXRight++;
  }
  if (cnt === 5) {
    this.gameState = true;
  }
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
}

// 클릭 이벤트 리스너를 추가하여 클릭 시 바둑알을 그립니다.
svg.addEventListener("click", (event) => {
  // 첫번째 줄의 라인이 몇인지가 필요함
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
  let x = event.clientX - svg.getBoundingClientRect().left; // 클릭한 위치의 X 좌표
  let y = event.clientY - svg.getBoundingClientRect().top; // 클릭한 위치의 Y 좌표
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
  const idxY = y / boardEndToLineDistance;
  const idxX = x / boardEndToLineDistance;
  if (arr[idxY][idxX] === 0) {
    arr[idxY][idxX] = player;
    check = !check;
    drawStone(x, y, color);
    widthGameState(idxX, idxY, player);
    heightGameState(idxX, idxY, player);
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
