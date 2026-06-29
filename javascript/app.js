/*------------------------ Cached Element References ------------------------*/

const startElement = document.querySelector('#start-btn')
const mainMenuElement = document.querySelector('#main-menu')
const settingButtonElement = document.querySelector('#setting-btn')
const settingMenuElement = document.querySelector('#setting-menu')
const mazePageElement = document.querySelector('#maze-container')
const mazeLevelElement = document.querySelector('#level-title')
const mazeElement = document.querySelector('#maze')

/*-------------------------------- Constants --------------------------------*/


const level1 = [
    "###############",
    "#P....#.......#",
    "#####.#.#####.#",
    "#...#.#.#...#.#",
    "#.#.#.#.#.#.#.#",
    "#.#...#...#.#.#",
    "#.#########.#.#",
    "#.#.......#.#.#",
    "#.#.#####.#.#.#",
    "#.#.#...#...#.#",
    "#.#.###.###.#.#",
    "#...#.#.#...#.#",
    "##.##.#.#.###.#",
    "#.......#...#E",
    "################"
]



/*---------------------------- Variables (state) ----------------------------*/

let level = 1
let timer = 30
let win = false
const tileSize = 22

/*-------------------------------- Functions --------------------------------*/

function startGame() {
    mainMenuElement.style.display = 'none'
    mazePageElement.style.display = 'block'

    renderLevel(level1)
}

function showSetting() {
    mainMenuElement.style.display = 'none'
    settingMenuElement.style.display = 'block'
}

function renderLevel(levelData) {
    mazeElement.innerHTML = ""

    mazeElement.style.gridTemplateColumns =
        `repeat(${levelData[0].length}, ${tileSize}px)`

    mazeElement.style.gridTemplateRows =
        `repeat(${levelData.length}, ${tileSize}px)`

    for (let row of levelData) {
        for (let cell of row) {
            const tile = document.createElement('div')

            tile.classList.add('cell')

            if (cell === '#') {
                tile.classList.add('wall')
            }
            else if (cell === '.') {
                tile.classList.add('path')
            }
            else if (cell === 'P') {
                tile.classList.add('player')
            }
            else if (cell === 'E') {
                tile.classList.add('exit')
            }

            mazeElement.appendChild(tile)
        }
    }


}



/*----------------------------- Event Listeners -----------------------------*/

startElement.addEventListener('click', startGame)
settingButtonElement.addEventListener('click', showSetting)
