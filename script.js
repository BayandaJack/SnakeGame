document.addEventListener('DOMContentLoaded', () => {
    //ALL LOGIC IN HERE WHEN DOM CONTENT IS LOADED
    const sec = document.querySelector('.board');
    //Logic for adding all the divs needed
    for (i=0; i<20; i++){
        for (j=0; j<20; j++){
            const cell = document.createElement('div');
            cell.classList.add("cell");
            cell.id = `cell-${i}-${j}`;
            sec.appendChild(cell);
        }
    }
    //Now to handle the movement logic
    let snake = [
        [10, 10], // head
        [10, 9],
        [10, 8],   // tail
    ];

    //let toPop = false;

    //////Section dealing with apple rendering logic///////
    function renderApple(){
        //removing the apple class from all previous cells
        document.querySelectorAll(".apple").forEach(c => c.classList.remove("apple"));
        //choosing random cell for apple
        const apple = [Math.floor(Math.random()*20), Math.floor(Math.random()*20)];
        //adding apple class to new apple coords
        const cell = document.querySelector(`#cell-${apple[0]}-${apple[1]}`);
        if (cell) {
            cell.classList.add("apple");
            cell.style.backgroundColor = "red";
        }
        //returning the new apple coords
        return apple;
    }

    let [apple_a, apple_b] = renderApple();

    //Reusable function to display the snake
    function renderSnake(snakeArr) {
        // Clear old visuals
        document.querySelectorAll(".snake").forEach(cell => {
            cell.classList.remove("snake");
            cell.style.backgroundColor = "transparent";
        });
        //
        
        // Add new visuals
        snakeArr.forEach(([row, col], index) => {
            const cell = document.querySelector(`#cell-${row}-${col}`);
            if (cell) {
                cell.classList.add("snake");
                cell.style.backgroundColor = index === 0 ? "#023020" : "green";
            }
        });

    }


    function nextMove(move, snakeArr) {
        const [row, col] = snakeArr[0];
        let newHead;

        switch (move) {
            case "UP":
                if (row - 1 < 0){
                    newHead = [19, col];
                }else{
                    newHead = [row - 1, col];
                }
            break;
            case "DOWN":
                if (row + 1 == 20){
                    newHead = [0, col];
                }else{
                    newHead = [row + 1, col];
                }
            break;
            case "LEFT":
                if (col - 1 < 0){
                    newHead = [row, 19];
                }else{
                    newHead = [row, col - 1];
                }
            break;
            case "RIGHT":
                if (col + 1 == 20){
                    newHead = [row, 0];
                }else{
                    newHead = [row, col + 1];
                }
            break;
        }

        let flag = false;
        for (const [row, col] of snakeArr){
            if (row === newHead[0] && col === newHead[1]){
                flag = true;
                alert('Cannot move into yourself in any way, GAME OVER!!!');
                location.reload();
            }
        }

        if (!flag){
            // Add the new head to the front
            snakeArr.unshift(newHead);
        }
    }


    document.addEventListener("keydown", (event) => {
        const key = event.key;
        let dir = "";
        switch (key){
            case "ArrowUp":
                dir = "UP";
                break;
            case "ArrowLeft":
                dir = "LEFT";
                break;
            case "ArrowDown":
                dir = "DOWN";
                break;
            case "ArrowRight":
                dir = "RIGHT";
                break;
        }
        console.log(dir);
        //change snake positioning
        nextMove(dir, snake);
        //logic to check if snake head and apple are equal
        const [[head_row, head_col]] = snake;
        if (apple_a === head_row && apple_b === head_col){
            //toPop = true;
            const cell = document.querySelector(`#cell-${apple_a}-${apple_b}`);
            cell.style.backgroundColor = "transparent";
            [apple_a, apple_b] = renderApple();
        }else{
            snake.pop();
        }
        //snake rendering logic
        renderSnake(snake);
    });

    ////////////////////The logic now is for the snake position on the board///////////////////


    //Logic for placing the snake on the board
    document.querySelectorAll(".snake").forEach(c => c.classList.remove("snake"));

    //4. paint the snake
    snake.forEach(([row, col], index) => {
        const cell = document.querySelector(`#cell-${row}-${col}`);
        if (cell) {
            cell.classList.add("snake");
            cell.style.backgroundColor = index === 0 ? "#023020" : "green";
        }else{
            console.warn("No cell found for", row, col);
        }
    });
    //

});