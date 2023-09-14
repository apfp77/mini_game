const lineCount = 17;
const maxSize = 850;
const svg = document.getElementById("game-board");
const stonesGroup = document.getElementById("stones");
const svgNamespace = "http://www.w3.org/2000/svg";
const arr = Array.from(Array(19), () => Array(19).fill(0));
let check = false;

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
  console.log("x: ", event.clientX);
  console.log("y: ", event.clientY);
  if (event.clientX > maxSize || event.clientX < 50) return;
  if (event.clientY > maxSize || event.clientY < 50) return;

  let x = event.clientX - svg.getBoundingClientRect().left; // 클릭한 위치의 X 좌표
  let y = event.clientY - svg.getBoundingClientRect().top; // 클릭한 위치의 Y 좌표
  const checkX = (x % 50) - 25;
  const checkY = (y % 50) - 25;

  if (checkX <= 0) {
    x = x - (x % 50);
  } else {
    x = x + 50 - (x % 50);
  }
  if (checkY <= 0) {
    y = y - (y % 50);
  } else {
    y = y + 50 - (y % 50);
  }
  const color = check === true ? "white" : "black";
  check = !check;
  drawStone(x, y, color);
});

// 세로 선
for (let i = 50; i <= maxSize; i += 50) {
  drawLine(50, i, maxSize, i);
}
// 가로 선
for (let i = 50; i <= maxSize; i += 50) {
  drawLine(i, 50, i, maxSize);
}
