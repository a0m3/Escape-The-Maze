/*------------------------ Cached Element References ------------------------*/

const startElement = document.querySelector('#start-btn')
const mainMenuElement = document.querySelector('#main-menu')
const settingButtonElement = document.querySelector('#setting-btn')
const settingMenuElement = document.querySelector('#setting-menu')
const mazePageElement = document.querySelector('#maze-container')
const mazeLevelElement = document.querySelector('#level-title')
const mazeElement = document.querySelector('#maze')
const winPopUpElement = document.querySelector('#win-popup')
const nextLvlBtnElement = document.querySelector('#nextLevelBtn')
const tryAgainBtnElement = document.querySelector('#tryAgainBtn')

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

const level2 = [
    "###################",
    "#P..#.......#.....#",
    "###.#.#######.###.#",
    "#...#.#...#...#...#",
    "#.###...#.###.###.#",
    "#.#...#.###...#...#",
    "#.#.###.#.#.###.###",
    "#.#.#...#.#.#.....#",
    "#.#.#.###.#.#.###.#",
    "#.#.#.#.....#.#.#.#",
    "#.#.#.#.#####.#.#.#",
    "#...#.#.#...#...#.#",
    "#####.#.#.###.###.#",
    "#.....#.#.#...#...#",
    "#.#####.#.#.#######",
    "#.#.....#.#.......#",
    "#.#.#####.#.#######",
    "#.........#.......E",
    "###################"
]

const level3 = [
    "#####################",
    "#P..#.......#.......#",
    "###.#.#######.#####.#",
    "#...#.#...#...#.....#",
    "#.###...#.###.###.#.#",
    "#.....#.#.#...#...#.#",
    "#.#.###.#.#.###.###.#",
    "#.#.#...#.#.#...#...#",
    "#.#.#.###.#.#.#######",
    "#.#.#.#...#.#.#.....#",
    "#.###.#.###.#...###.#",
    "#...#.#...#.#.#.#...#",
    "###.#.###.#.###.#.#.#",
    "#...###...#.#...#.#.#",
    "#.###.#.###.#.###.#.#",
    "#.#...#.....#.#...#.#",
    "#.#.###.#.###.#.#####",
    "#.#.....#.#.#.#.....#",
    "#.#########.#.#####.#",
    "#...........#.....#.E",
    "#####################"
]

const level4 = [
    "######################",
    "#P..#.......#........#",
    "###.#.#######.###.####",
    "#...#.#...#...#......#",
    "#.#.#.#.#.###.###.####",
    "#.#...#.#.#...#......#",
    "#.#.###.#...###.####.#",
    "#.#.#...###.#...#....#",
    "#.#.#.###.#.#.########",
    "#.#.#.#...#.#.#......#",
    "#.###.#.#####.#.###.##",
    "#...#.#...#.#...#....#",
    "###.#.###.#.###.#.##.#",
    "#...#.#...#.#...#.#..#",
    "#.###.#.###.#.###.#..#",
    "#.#...#.#...#.#...#..#",
    "#.#.###.#.###.#.######",
    "#.#.........#.#......#",
    "#.#########.#.######.#",
    "#.#.....#...#...#.#..#",
    "#...........#...#....E",
    "######################"
]



const levels = [level1, level2, level3, level4]

/*---------------------------- Variables (state) ----------------------------*/

let level = 1
let timer = 30
let win = false
const tileSize = 22
let playerRow
let PlayerCol
let currentMaze = []

/*-------------------------------- Functions --------------------------------*/


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

function startGame() {
    mainMenuElement.style.display = 'none'
    mazePageElement.style.display = 'block'
    level = 0
    loadLevel(level)
}

function loadLevel(levelIndex) {
    currentMaze = levels[levelIndex].map(row => row.split(''))
    win = false
    mazeLevelElement.textContent = 'level ' + (levelIndex + 1)
    renderLevel(currentMaze)
}

function findPlayer(maze) {
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[r].length; c++) {
            if (maze[r][c] === 'P') return { row: r, col: c }
        }
    }
}

function movePlayer(e) {
    const { row, col } = findPlayer(currentMaze)

    let newRow = row
    let newCol = col

    if (e.key === 'ArrowUp') newRow--
    if (e.key === 'ArrowDown') newRow++
    if (e.key === 'ArrowLeft') newCol--
    if (e.key === 'ArrowRight') newCol++
    const target = currentMaze[newRow][newCol]

    if (target === '#') return

    if (target === 'E') {
        winLevel()
        return
    }

    currentMaze[row][col] = '.'
    currentMaze[newRow][newCol] = 'P'

    renderLevel(currentMaze)
}




function winLevel() {
    winPopUpElement.style.display = 'flex'
}

function tryAgain() {
    winPopUpElement.style.display = 'none'
    loadLevel(level)
}

function nextLevel() {
    winPopUpElement.style.display = 'none'
    level++

    if (level >= levels.length) {
        return
    }
    loadLevel(level)
}


/*----------------------------- Event Listeners -----------------------------*/

startElement.addEventListener('click', startGame)
settingButtonElement.addEventListener('click', showSetting)
document.addEventListener('keydown', movePlayer)
tryAgainBtnElement.addEventListener('click', tryAgain)
nextLvlBtnElement.addEventListener('click', nextLevel)    