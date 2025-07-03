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

    ////////////////////The logic now is for the snake position on the board///////////////////
    let snake = [
        [10, 10], // head
        [10, 9],
        [10, 8]   // tail
    ];

    //Displaying the snake on the board
    for (const part of snake){
        
        const cell = document.querySelector(`#cell-${part[0]}-${part[1]}`);
        cell.classList.add("snake")
        cell.style.backgroundColor = "green";
    }

    document.querySelectorAll(".snake").forEach(c => c.classList.remove("snake"));

// 4. paint the snake
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