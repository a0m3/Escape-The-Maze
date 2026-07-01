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
const timeOutElement = document.querySelector('#timeout')
const timeElement = document.querySelector('#timer')
const exitBtn = document.querySelector('#exitBtn')
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
    "#.#####.#.#.#####.#",
    "#.#.....#.#.#.....#",
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

const level5 = [
    "########################",
    "#P..#......#....#......#",
    "###.#.####.#.#########.#",
    "#...#.#..#.#.#...#...#.#",
    "#.###.##.#.#.#.#####.#.#",
    "#.#......#...#.#...#.#.#",
    "#.#.##########.#.#.#.#.#",
    "#...#..........#.#...#.#",
    "#.#.#.##########.###.#.#",
    "#.#.#.#............#.#.#",
    "#.#.#.###.########.#.#.#",
    "#.#...#......#.....#...#",
    "###.########.#.######.##",
    "#..........#.#.#.......#",
    "#.####.###.#.#.#.#####.#",
    "#.#....#.#.#.#.#.#...#.#",
    "#.#.####.#.#.#####.#.#.#",
    "#.#......#.#.......#.#.#",
    "#.########.#########.#.#",
    "#.#........#.........#.#",
    "#.#.########.#########.#",
    "#.#........#.#.......#.#",
    "#.########.....#######E#",
    "########################"
]


const levels = [level1, level2, level3, level4, level5]

const levelTimes = [25, 35, 40, 40, 40]

/*---------------------------- Variables (state) ----------------------------*/


let win = false
const tileSize = 22
let playerRow
let PlayerCol
let currentMaze = []
let levelCurrent = 0
let timeInterval = null
let intervalValue
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
    time = levelTimes[level]
    loadLevel(level)
}

function loadLevel(levelIndex) {
    currentMaze = levels[levelIndex].map(row => row.split(''))
    win = false
    mazeLevelElement.textContent = 'level ' + (levelIndex + 1)
    renderLevel(currentMaze)
    startTimer(levelTimes[levelIndex])
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

    if (level + 1 >= levels.length) {
        nextLvlBtnElement.style.display = 'none'
    }
    clearInterval(intervalValue)
    winPopUpElement.style.display = 'flex'
}

function timeout() {
    timeOutElement.style.display = 'flex'
}

function tryAgain() {
    winPopUpElement.style.display = 'none'
    timeOutElement.style.display = 'none'
    time = levelTimes[level]
    loadLevel(level)
}

function nextLevel() {
    winPopUpElement.style.display = 'none'
    level++

    if (level >= levels.length) {
        return
    }
    time = levelTimes[level]
    loadLevel(level)
}


function exit() {
    mainMenuElement.style.display = 'flex'
    mazePageElement.style.display = 'none'
}


function startTimer() {
    clearInterval(intervalValue)
    intervalValue = setInterval(() => {
        time--
        console.log(time)

        if (time <= 0) {
            clearInterval(intervalValue)
            timeout()
        }

        if(win === true){

        }
    }, 1000)
}


/*----------------------------- Event Listeners -----------------------------*/

startElement.addEventListener('click', startGame)
settingButtonElement.addEventListener('click', showSetting)
document.addEventListener('keydown', movePlayer)
tryAgainBtnElement.addEventListener('click', tryAgain)
nextLvlBtnElement.addEventListener('click', nextLevel)
exitBtn.addEventListener('click', exit)