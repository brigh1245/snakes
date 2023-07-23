document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('gameBoard');
    const width = 20;
    const height = 20;
    let squares = [];
    let snake = [2, 1, 0];
    let foodIndex = 0;
    let direction = 1;
    let intervalTime = 100;
    let intervalId = 0;

    function createBoard() {
        for (let i = 0; i < width * height; i++) {
            const square = document.createElement('div');
            squares.push(square);
            board.appendChild(square);
        }
    }

    createBoard();

    function startGame() {
        snake.forEach((index) => squares[index].classList.add('snake'));
        generateFood();

        intervalId = setInterval(move, intervalTime);
    }

    function move() {
        if (checkCollision()) {
            return clearInterval(intervalId);
        }

        const tail = snake.pop();
        squares[tail].classList.remove('snake');
        snake.unshift(snake[0] + direction);

        if (snake[0] === foodIndex) {
            squares[foodIndex].classList.remove('food');
            snake.push(tail);
            generateFood();
            intervalTime -= 5;
            intervalId = setInterval(move, intervalTime);
        }

        squares[snake[0]].classList.add('snake');
    }

    function generateFood() {
        do {
            foodIndex = Math.floor(Math.random() * squares.length);
        } while (squares[foodIndex].classList.contains('snake'));

        squares[foodIndex].classList.add('food');
    }

    function checkCollision() {
        if (
            (snake[0] % width === 0 && direction === -1) ||
            (snake[0] % width === width - 1 && direction === 1) ||
            (snake[0] < width && direction === -width) ||
            (snake[0] >= width * (height - 1) && direction === width) ||
            squares[snake[0] + direction].classList.contains('snake')
        ) {
            return true;
        }

        return false;
    }

    function control(e) {
        if (e.keyCode === 37) {
            direction = -1; // Left
        } else if (e.keyCode === 38) {
            direction = -width; // Up
        } else if (e.keyCode === 39) {
            direction = 1; // Right
        } else if (e.keyCode === 40) {
            direction = width; // Down
        }
    }

    document.addEventListener('keydown', control);
    startGame();
});