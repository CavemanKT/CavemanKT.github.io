let guessItem
let interval = 100
let solution
let results = []
let gameOver = false


function setup() {
    createCanvas(innerWidth, innerHeight);
    textAlign(CENTER, CENTER)
}


function draw() {

    var gameScore = getGameScore(results) // as long as results array is empty, the gameScore object is empty, then it will render the the game.  

    if (gameScore.loss >= 3 || gameScore.total === 10) {
        gameOver = true
        displayGameOver(gameScore)
        return
    }

    background(254);

    if (frameCount === 1 || frameCount % interval === 0) {
        solution = null
        guessItem = new GuessItem(width / 2, height / 2, 10)
    }

    if (guessItem) {
        guessItem.render(gameScore.total)
    }
    if (solution == true || solution == false) {
        solutionMsg(gameScore.total, solution)
    }

}

function solutionMsg(seed, solution) {
    var trueMsg = [
        'GD!',
        'doing great!',
        'omg!',
        'such win',
        'I appreciate you.',
        'impressive.'
    ]
    var falseMsg = [
        'oh no!',
        'better luck next time!',
        'pft....',
        ':('
    ]

    var msgs

    push()
    textAlign(CENTER, CENTER)
    textSize(36)
    fill(237, 34, 93)
    randomSeed(seed * 10000)

    if (solution === true) {
        background(255)
        msgs = trueMsg
    } else if (solution === false) {
        background(0)
        msgs = falseMsg
    }
    translate(width / 2, height / 2)
    text(msgs[parseInt(random(msgs.length), 10)], 0, 0)
    pop()
}

function displayGameOver(score) {
    push()
    background(255)
    textAlign(CENTER, CENTER)
    translate(width / 2, height / 2)
    fill(237, 34, 93)
    textSize(24)
    text('Game Over!', 0, 0)

    fill(0)
    translate(0, 36)
    text('You have ' + score.win + ' correct guesses', 0, 0)

    var alternatingValue = map(sin(frameCount / 20), -1, 1, 0, 255)
    fill(237, 34, 93, alternatingValue)
    textSize(16)
    translate(0, 80)
    text("PRESS ENTER", 0, 0)
    pop()

}

function getGameScore(score) {
    var wins = 0
    var losses = 0
    var total = score.length
    for (var i = 0; i < score.length; i++) {
        var item = score[i]
        if (item === true) {
            wins += 1
        } else {
            losses += 1
        }

    }

    return {
        win: wins, loss: losses, total: total
    }
}

function restartGame() {
    results = []
    gameOver = false
    solution = null
}

function keyPressed() {
    if (gameOver === true) {
        if (keyCode === ENTER) {
            console.log("restart the game!")
            restartGame()
            return
        }
    }
    if (guessItem !== null) {
        console.log('you pressed', key)
        solution = guessItem.solve(key)
        guessItem = null
        if (solution) {
            results.push(true)
        } else {
            results.push(false)
        }
        console.log(results)
    } else {
        console.log("nothing to be solved")
    }

}

function GuessItem(x, y, scl) {
    this.x = x
    this.y = y
    this.scale = scl
    this.scaleIncrement = 0.5
    this.content = getContent()
    this.alpha = 255
    this.alphaDecrement = 3
    this.solved;
    this.contentMap = {
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '0': 'zero'
    }


    function getContent() {
        return String(parseInt(random(10), 10))
    }

    this.solve = function (input) {
        if (input == this.content) {
            this.solved = true
        } else {
            this.solved = false
        }
        return this.solved
    }



    this.render = function (gameScoreTotal) {
        if (this.solved == false) {
            return;
        }

        // 1st circle
        push()
        noFill()
        translate(this.x, this.y)
        let r1 = parseInt(random(255), 10)
        let g1 = parseInt(random(255), 10)
        let b1 = parseInt(random(255), 10)

        stroke(r1, g1, b1)
        scale(this.scale)
        ellipse(0, 0, 50, 50)
        pop()

        // 2nd circle
        push()
        noFill()
        translate(this.x, this.y)
        let r2 = parseInt(random(255), 10)
        let g2 = parseInt(random(255), 10)
        let b2 = parseInt(random(255), 10)

        stroke(r2, g2, b2)
        strokeWeight(5)
        scale(this.scale)
        ellipse(0, 0, 108, 108)
        pop()


        // 3rd circle
        push()
        noFill()
        translate(this.x, this.y)
        let r3 = parseInt(random(255), 10)
        let g3 = parseInt(random(255), 10)
        let b3 = parseInt(random(255), 10)

        stroke(r3, g3, b3)
        strokeWeight(10)
        scale(this.scale)
        ellipse(0, 0, 127, 127)
        pop()


        push()
        fill(0, this.alpha)
        textAlign(CENTER, CENTER)
        translate(this.x, this.y)
        scale(this.scale)
        console.log(this.content)
        text(this.contentMap[this.content], 0, 0)
        this.scale = this.scale + this.scaleIncrement
        this.alpha = this.alpha - this.alphaDecrement

        pop()
    }
}