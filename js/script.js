const gridContainer = document.querySelector(".grid-container");
const gridSize = 960;

const colorListener = function (event) {
    event.currentTarget.style.backgroundColor = "blue";
}

function makeGrid(size) {
    for(let i = 0; i < size*size; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${100/size}%`;
        cell.addEventListener("mouseover", colorListener, false);
        gridContainer.appendChild(cell);
    }
}

makeGrid(16);
