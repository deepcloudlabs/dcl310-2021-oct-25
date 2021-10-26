/*
    View: game.html -> html, css (bootstrap)
    ViewModel: mastermind.js -> js
 */

// Before ES6:
function Move(guess, message) {
    this.guess = guess;
    this.message = message;
}

// ES6: syntactic sugar: class MoveES6 {...} --> function Move(...){...}
class MoveES6 {
    constructor(guess, message) {
        this.guess = guess;
        this.message = message;
    }
}

class GameStatistics {
    constructor() {
        this.wins = ko.observable(0);
        this.loses = ko.observable(0);
        this.total = ko.computed(() => {
            return this.wins() + this.loses()
        });
    }

    playerWins = () => {
        this.wins(this.wins()+1);
    }
    playerLoses = () => {
        this.loses(this.loses()+1);
    }
}

//ES6: class
class MastermindViewModel { // Knockout's ViewModel
    constructor() {
        this.gameLevel = ko.observable(3);
        this.tries = ko.observable(0);
        this.guess = ko.observable(123);
        this.moves = ko.observableArray([]); // empty array
        this.secret = this.createSecret();
        this.counter = ko.observable(60);
        this.statistics = new GameStatistics();
        // this.play = this.play.bind(this);
    }

    countDown = () => {
        this.counter(this.counter()-1);
        if (this.counter() <= 0) {
            this.initGame();
            this.statistics.playerLoses();
            return "loses";
        }
        return "continues";
    }

    play = () => {
        this.tries(this.tries()+1);
        if (Number(this.guess()) === this.secret) {
            this.gameLevel(this.gameLevel()+1);
            if (this.gameLevel() > 10) {
                this.gameLevel(3);
                this.initGame();
                this.statistics.playerWins();
                return "wins";
            }
            this.initGame();
        } else {
            if (this.tries() > 10) {
                this.initGame();
                this.statistics.playerLoses();
                return "loses";
            } else {
                this.moves.push(this.createMove(this.guess()));
            }
        }
    }

    createSecret = () => {
        let digits = []; // [5, 4, 9] -> 549
        digits.push(this.createRandomDigit(1, 9));
        while (digits.length < this.gameLevel()) {
            let randomDigit = this.createRandomDigit(0, 9);
            if (!digits.includes(randomDigit))
                digits.push(randomDigit);
        }
        return digits.reduce((number, digit) => 10 * number + digit, 0);
    }

    createRandomDigit = (min = 0, max = 9) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    initGame = () => {
        this.tries(0);
        this.counter(60);
        this.moves([]);
        this.secret = this.createSecret();
    }

    createMove = (guess) => {
        let guessAsString = guess.toString();
        let secretAsString = this.secret.toString();
        let perfectMatch = 0, partialMatch = 0;
        for (let i = 0; i < guessAsString.length; ++i) {
            let g = guessAsString.charAt(i);
            for (let j = 0; j < secretAsString.length; ++j) {
                let s = secretAsString.charAt(j);
                if (s === g) {
                    if (i === j) {
                        perfectMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        let message = "";
        if (perfectMatch == 0 && partialMatch == 0) {
            message = "No match";
        } else {
            if (perfectMatch > 0)
                message += "+" + perfectMatch;
            if (partialMatch > 0)
                message += "-" + partialMatch;
        }
        return new Move(guess, message);
    }
}