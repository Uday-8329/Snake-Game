const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20; // Size of the snake and the food tile
let snake = [{x: 50, y: 50}]; // Initial position of the snake
let food = {x: 80, y: 80};  // Food initial position
let direction = "RIGHT"; // Snake's movement direction
let score = 0; // Initialize the score

// Set up canvas to be responsive
canvas.width = window.innerWidth * 0.8; // 80% of screen width
canvas.height = window.innerHeight * 0.6; // 60% of screen height

// Movement map for directions
const directionMap = {
    "UP": {x: 0, y: -tileSize},
    "DOWN": {x: 0, y: tileSize},
    "LEFT": {x: -tileSize, y: 0},
    "RIGHT": {x: tileSize, y: 0}
};

// Function to generate new food at a random location
function generateFood() {
    food.x = Math.floor(Math.random() * Math.floor(canvas.width / tileSize)) * tileSize;
    food.y = Math.floor(Math.random() * Math.floor(canvas.height / tileSize)) * tileSize;
}

// Function to draw the snake and food
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "lime";  // Head is green, body is lime
        ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
    });
    
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, tileSize, tileSize);

    // Display the score
    document.getElementById("score").textContent = `Score: ${score}`;
}

// Move the snake based on direction
function move() {
    const head = Object.assign({}, snake[0]);
    head.x += directionMap[direction].x;
    head.y += directionMap[direction].y;

    // Collision detection
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collisionWithSelf(head)) {
        return gameOver();
    }

    snake.unshift(head);

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
    
    draw();
}

// Check if snake collides with itself
function collisionWithSelf(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// End game
function gameOver() {
    alert(`Game Over! Your score is ${score}`);
    snake = [{x: 50, y: 50}];
    score = 0;
    direction = "RIGHT";
}

// Capture arrow keys for movement
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Game loop to animate snake and handle game timing
function gameLoop() {
    move();
    setTimeout(gameLoop, 100); // Game speed
}

// Start the game
gameLoop();