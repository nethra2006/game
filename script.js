const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Move basket with arrow keys
document.addEventListener("keydown", (e) => {
  let basketPos = basket.offsetLeft;
  if (e.key === "ArrowLeft" && basketPos > 0) {
    basket.style.left = basketPos - 20 + "px";
  }
  if (e.key === "ArrowRight" && basketPos < 340) {
    basket.style.left = basketPos + 20 + "px";
  }
});

// Create falling fruits
function createFruit() {
  const fruit = document.createElement("div");
  fruit.classList.add("fruit");
  fruit.style.background = randomColor();
  fruit.style.left = Math.floor(Math.random() * 360) + "px";
  fruit.style.top = "0px";
  gameArea.appendChild(fruit);

  let fallInterval = setInterval(() => {
    let fruitTop = parseInt(fruit.style.top);
    fruit.style.top = fruitTop + 5 + "px";

    // Check collision with basket
    let basketRect = basket.getBoundingClientRect();
    let fruitRect = fruit.getBoundingClientRect();

    if (
      fruitRect.bottom >= basketRect.top &&
      fruitRect.left >= basketRect.left &&
      fruitRect.right <= basketRect.right
    ) {
      score++;
      scoreDisplay.textContent = "Score: " + score;
      fruit.remove();
      clearInterval(fallInterval);
    }

    // Remove fruit if it falls out
    if (fruitTop > 600) {
      fruit.remove();
      clearInterval(fallInterval);
    }
  }, 50);
}

// Random fruit color
function randomColor() {
  const colors = ["red", "yellow", "green", "orange", "purple"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Drop fruits every 2 seconds
setInterval(createFruit, 2000);
