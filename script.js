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
