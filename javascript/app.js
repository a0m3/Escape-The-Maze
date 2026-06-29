/*------------------------ Cached Element References ------------------------*/

const startElement = document.querySelector('#start-btn')
const mainMenuElement = document.querySelector('#main-menu')
const settingButtonElement = document.querySelector('#setting-btn')
const settingMenuElement = document.querySelector('#setting-menu')

/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

/*-------------------------------- Functions --------------------------------*/

function startGame() {
    mainMenuElement.style.display = 'none';
}

function showSetting(){
    mainMenuElement.style.display = 'none';
    settingMenuElement.style.display = 'block'
}
/*----------------------------- Event Listeners -----------------------------*/

startElement.addEventListener('click', startGame)
settingButtonElement.addEventListener('click', showSetting)