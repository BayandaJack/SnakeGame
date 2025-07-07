document.addEventListener('DOMContentLoaded', () => {
    //ALL LOGIC IN HERE WHEN DOM CONTENT IS LOADED

    //Now to handle the movement logic
    let snake = [
        [10, 10], // head
        [10, 9],
        [10, 8]   // tail
    ];

    //Reusable function to display the snake
    function renderSnake(snakeArr) {
        // Clear old visuals
        document.querySelectorAll(".snake").forEach(cell => {
            cell.classList.remove("snake");
            cell.style.backgroundColor = "transparent";
        });
        //
        
        // Add new visuals
        for (const [row, col] of snakeArr) {
            const cell = document.querySelector(`#cell-${row}-${col}`);
            if (cell) cell.classList.add("snake");
            cell.style.backgroundColor = "green";   // immediate inline style
        }
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

        // Add the new head to the front
        snakeArr.unshift(newHead);

        // Remove the tail (for normal movement)
        snakeArr.pop();
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
        renderSnake(snake);
    });
    
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

    ////////////////////The logic now is for the snake position on the board///////////////////


    //Logic for placing the snake on the board
    document.querySelectorAll(".snake").forEach(c => c.classList.remove("snake"));

    //4. paint the snake
    for (const [row, col] of snake) {
        const cell = document.querySelector(`#cell-${row}-${col}`);
        if (cell) {
        cell.classList.add("snake");            // needs CSS rule
        cell.style.backgroundColor = "green";   // immediate inline fallback
        } else {
            console.warn("No cell found for", row, col);
        }
    }

});