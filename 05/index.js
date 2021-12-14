const fs = require('fs')

const filePath = './input.txt'
const boundary = 1000

// const filePath = './test.txt'
// const boundary = 10

let floor

function getEmptyFloor() {
    const floor = new Array(boundary)

    for (let i = 0; i < boundary; i++) {
        const row = new Array(boundary)
        row.fill(0)

        floor[i] = row
    }

    return floor
}

function drawHorizontalLine(y, x1, x2) {
    let x = x1

    while (x <= x2) {
        floor[y][x] += 1
        x += 1
    }
}

function drawVerticalLine(x, y1, y2) {
    let y = y1

    while (y <= y2) {
        floor[y][x] += 1
        y += 1
    }
}

function drawDiagonalLineToLeft(x1, y1, y2) {
    let x = Number(x1)
    let y = Number(y1)

    while (y <= y2) {
        floor[y][x] += 1

        x -= 1
        y += 1
    }
}

function drawDiagonalLineToRight(x1, y1, y2) {
    let x = Number(x1)
    let y = Number(y1)

    while (y <= y2) {
        floor[y][x] += 1

        x += 1
        y += 1
    }
}

function drawVents(input, withDiagonals) {
    const results = input.match(/(\d+),(\d+) -> (\d+),(\d+)/).slice(1).map(result => Number(result))
    const [x1, y1, x2, y2] = results

    const isHorizontal = y1 === y2
    const isVertical = x1 === x2

    if (isHorizontal) {
        drawHorizontalLine(y1, Math.min(x1, x2), Math.max(x1, x2))
    } else if (isVertical) {
        drawVerticalLine(x1, Math.min(y1, y2), Math.max(y1, y2))
    } else if (withDiagonals) {
        if (x1 < x2 && y1 < y2) {
            drawDiagonalLineToRight(x1, y1, y2)
        } else if (x1 > x2 && y1 < y2) {
            drawDiagonalLineToLeft(x1, y1, y2)
        } else if (x1 < x2 && y1 > y2) {
            drawDiagonalLineToLeft(x2, y2, y1)
        } else if (x1 > x2 && y1 > y2){
            drawDiagonalLineToRight(x2, y2, y1)
        }
    }
}

function countOverlaps() {
    return floor.reduce((count, row) => {
        return row.reduce((rowCount, cell) => {
            if (cell >= 2) {
                return rowCount + 1
            }

            return rowCount
        }, count)
    }, 0)
}

function output() {
    const content = floor.map(row => row.join('')).join('\n').replace(/0/g, '.')

    fs.writeFileSync('./output.txt', content)
}

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
        const inputs = data.trim().split('\n')

        console.log('PART ONE')
        floor = getEmptyFloor()
        inputs.forEach((input) => {
            drawVents(input)
        })

        let count = countOverlaps()
        console.log({ count })

        console.log('PART TWO')
        floor = getEmptyFloor()
        inputs.forEach((input) => {
            drawVents(input, true)
        })

        output()
        count = countOverlaps()
        console.log({ count })
    } else {
        console.log(err)
    }
})
