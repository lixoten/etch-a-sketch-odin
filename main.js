const containerElement = document.getElementById('pad-container');
const clearButton = document.getElementById('clear-button');
const changeSizeButton = document.getElementById('change-size-button');
const padSizeElement = document.getElementById('pad-size');
const selectColorMode = document.getElementsByName('color-mode');
const opacityCheck = document.getElementById('opacity-check');

const width = 500;
let colorMode = "black"
let padSize = 10;
containerElement.style.width = width + "px";

changeSizeButton.addEventListener("click", () => {
    changeSizeOfPad();
})

clearButton.addEventListener("click", () => {
    containerElement.innerHTML = "";
    createDivs(padSize)
})

for(let i = 0; i < selectColorMode.length; i++) {
    selectColorMode[i].addEventListener("change", (event) => {
        colorMode = selectColorMode[i].value;
    });
}

function changeSizeOfPad() {
    padSize = prompt("Please enter the number of columns. Max: (100)");

    if (padSize <= 0 || padSize === null || padSize === "" || !Number.isInteger(Number(padSize))) {
        padSize = 16
        displayMessage("Invalid value. Size set to 16");
    } else if (padSize > 100) {
        padSize = 100
        displayMessage("Invalid size. Size set to 100");
    }
    containerElement.innerHTML = "";
    createDivs(padSize);
}

function updatePadSizeButtonText(padSize) {
    padSizeElement.textContent = `${padSize}x${padSize}`;
}

function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.id = "message-area";
    messageElement.textContent = message;

    containerElement.insertAdjacentElement('beforebegin', messageElement)
    setTimeout(() => {
        messageElement.remove();
    }, 5000); // 5000
}

function createDivs(padSize) {
    updatePadSizeButtonText(padSize);

    for (let r = 0; r < padSize; r++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row')

        for (let c = 0; c < padSize; c++) {
            const mySquare = document.createElement('div')
            mySquare.classList.add("square");

            mySquare.addEventListener("mouseover", (event) => {
                let currentOpacity = parseFloat(event.target.style.opacity);
                let isOpacityChecked = opacityCheck.checked;
                if (colorMode === "erase") {
                    currentOpacity = 0;
                }
                if (mySquare.classList.contains("set") && currentOpacity === 1) {
                    return;
                }

                // if the opacity is already at 1, just return because it is maxed
                if (currentOpacity === 1) {
                    return;
                }
                if (isNaN(currentOpacity)) {
                    currentOpacity = 0;
                }
                if (isOpacityChecked) {
                    currentOpacity += 0.1;
                    event.target.style.opacity = currentOpacity.toString();
                } else {
                    currentOpacity = 1;
                }

                const isColorSet = mySquare.classList.contains("set");

                if (colorMode === "black") {
                    if (!isColorSet) mySquare.style.background = getDefaultColor();
                    mySquare.style.opacity = currentOpacity.toString();
                    mySquare.classList.add("set");
                } else if (colorMode === "random") {
                    if (!isColorSet) mySquare.style.background = getRandomColor();
                    mySquare.style.opacity = currentOpacity.toString();
                    mySquare.classList.add("set");
                } else {
                    mySquare.style.background = getEraseColor();
                    mySquare.style.opacity = currentOpacity.toString();
                    mySquare.classList.remove("set");
                    event.target.style.opacity = "";
                }
            })
            rowElement.appendChild(mySquare);
        }
        containerElement.appendChild(rowElement);
    }
}

function getEraseColor() {
    const red = 255;
    const green = 255;
    const blue = 255;

    return `rgb(${red}, ${green}, ${blue})`;
}

function getDefaultColor() {
    const red = 0;
    const green = 0;
    const blue = 0;

    return `rgb(${red}, ${green}, ${blue})`;
}

function getRandomColor() {
    const red = randomNumber();
    const green = randomNumber();
    const blue = randomNumber();

    return `rgb(${red}, ${green}, ${blue})`;
}

function randomNumber() {
    const color = Math.floor(Math.random() * 256);
    return color
}

createDivs(10)