// d5 mouse animation

let ball
let x, y = 0
let size = 0
function setup() {
    console.log(window.innerWidth, window.innerHeight)
    createCanvas(windowWidth, windowHeight);
    let canvas = document.querySelector('canvas')


    canvas.classList.add("canvas")
}

function draw() {
    clear()


    x = mouseX
    y = mouseY

    drawingContext.shadowBlur = 10
    drawingContext.shadowColor = 'black'
    noStroke()
    ellipse(x, y, size, size)
    size++
    if (size == 100) {
        size = 0
    }
}