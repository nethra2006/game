const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// Move basket with arrow keys
document.addEventListener("keydown", (e) => {
  let basketPos = basket.offsetLeft;
  if (e.key === "ArrowLeft" && basketPos > 0) {
    basket.style.left = basketPos - 20 + "px";
  }
  if (e.key === "ArrowRight" && basketPos < (gameArea.offsetWidth - basket.offsetWidth)) {
    basket.style.left = basketPos + 20 + "px";
  }
});

// Create falling fruits
function createFruit() {
  const fruit = document.createElement("div");
  fruit.classList.add("fruit");

  // Use your uploaded PNGs
  const fruits = ["apple.png", "banana.png", "eggplant.png", "watermelon.png"];
  const chosenFruit = fruits[Math.floor(Math.random() * fruits.length)];
  fruit.style.backgroundImage = `url("images/${chosenFruit}")`;

  fruit.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
  fruit.style.top = "0px";
  gameArea.appendChild(fruit);

  let fallInterval = setInterval(() => {
    let fruitTop = parseInt(fruit.style.top);
    fruit.style.top = fruitTop + 5 + "px";

    let basketRect = basket.getBoundingClientRect();
    let fruitRect = fruit.getBoundingClientRect();

    // Collision detection
    if (
      fruitRect.bottom >= basketRect.top &&
      fruitRect.left < basketRect.right &&
      fruitRect.right > basketRect.left
    ) {
      score++;
      scoreDisplay.textContent = "Score: " + score;
      checkHighScore();
      fruit.remove();
      clearInterval(fallInterval);
    }

    // Remove fruit if it falls out
    if (fruitTop > gameArea.offsetHeight) {
      fruit.remove();
      clearInterval(fallInterval);
    }
  }, 50);
}

// High score check
function checkHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    showHighScoreMessage();
  }
}

// Show high score message
function showHighScoreMessage() {
  const msg = document.createElement("div");
  msg.textContent = "🎉 New High Score! 🎉";
  msg.style.position = "absolute";
  msg.style.top = "50%";
  msg.style.left = "50%";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.fontSize = "30px";
  msg.style.color = "green";
  msg.style.fontWeight = "bold";
  msg.style.background = "yellow";
  msg.style.padding = "10px";
  msg.style.borderRadius = "10px";
  gameArea.appendChild(msg);

  setTimeout(() => msg.remove(), 2000);
}

// Drop fruits every 2 seconds
setInterval(createFruit, 2000);
if (
  fruitRect.bottom >= basketRect.top &&
  fruitRect.top <= basketRect.bottom &&
  fruitRect.left < basketRect.right &&
  fruitRect.right > basketRect.left
) {
  score++;
  scoreDisplay.textContent = "Score: " + score;
  checkHighScore();
  fruit.remove();
  clearInterval(fallInterval);
}
