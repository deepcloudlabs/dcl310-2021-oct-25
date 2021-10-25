let emptyElement = (element) => {
    let node = element;
    while (element.hasChildNodes()) {
        if (node.hasChildNodes()) {
            node = node.lastChild;
        } else {
            node = node.parentNode;
            node.removeChild(node.lastChild);
        }
    }
} ;

let masterMindViewModel = new MastermindViewModel();
window.onload = () => {
    let playButton = document.querySelector("#play")
    let guessInputText = document.querySelector("#guess")
    let tries = document.querySelector("#tries")
    let gameLevel = document.querySelector("#gameLevel")
    let moves = document.querySelector("#moves")

    playButton.addEventListener('click', function(e){
        masterMindViewModel.play(guessInputText.value)
        tries.innerHTML = masterMindViewModel.tries
        gameLevel.innerHTML = masterMindViewModel.gameLevel
        if (masterMindViewModel.moves.length === 0){
            emptyElement(moves)
        } else {
            let length = masterMindViewModel.moves.length;
            let lastMove = masterMindViewModel.moves[length -1];
            let row = moves.insertRow()
            let cellNo = row.insertCell(0);
            cellNo.appendChild(document.createTextNode(length.toString()));
            let cellGuess = row.insertCell(1);
            cellGuess.appendChild(document.createTextNode(lastMove.guess.toString()));
            let cellMessage = row.insertCell(2);
            cellMessage.appendChild(document.createTextNode(lastMove.message.toString()));
        }
    } , false)
}