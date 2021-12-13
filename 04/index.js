const fs = require('fs')
const filePath = './input.txt'

function logBoard(board) {
    console.log('[')

    board.forEach((row) => {
        const rowString = row.map(({ number, checked }) => {
            return `${checked ? '✅' : '❌'} ${number.toString().padStart(2, ' ')}`
        }).join(', ')
        console.log(`    [${rowString}]`)
    })

    console.log(']')
}

function logBoards(boards) {
    boards.forEach(logBoard)
}

function hasOneCompleteRow(board) {
    return board.some(row => row.every(({ checked }) => checked))
}

function hasOneCompleteColumn(board) {
    let hasOneCompleteColumn = false
    const columnsCount = board[0].length

    for (let i = 0; i < columnsCount; i++) {
        const isColumnComplete = board.every(row => row[i].checked)

        if (isColumnComplete) {
            hasOneCompleteColumn = true
            break
        }
    }

    return hasOneCompleteColumn
}

function checkNumberInBoard(number, board) {
    board.forEach((row) => {
        row.forEach((boardNumber) => {
            if (boardNumber.number === number) {
                boardNumber.checked = true
            }
        })
    })
}

function getUnmarkedSum(board) {
    let sum = 0

    board.forEach((row) => {
        row.forEach(({ number, checked }) => {
            if (!checked) {
                sum += number
            }
        })
    })

    return sum
}

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
        const [rawNumbers, ...rawBoards] = data.trim().split('\n\n')

        const numbers = rawNumbers.split(',').map(rawNumber => Number(rawNumber))

        const boards = rawBoards.map((rawBoard) => {
            const rawBoardRows = rawBoard.split('\n')
            return rawBoardRows.map((rawBoardRow) => {
                return rawBoardRow.replace(/ +/g, ' ').trim().split(' ')
                    .map((boardNumber) => {
                        return {
                            number: Number(boardNumber),
                            checked: false,
                        }
                    })
            })
        })

        let winner = {
            board: null,
            latestNumber: null,
            unmarkedSum: null,
        }

        let lastWinner = {
            board: null,
            latestNumber: null,
            unmarkedSum: null,
        }

        for (number of numbers) {
            boards.forEach((board) => {
                if (!board.hasOneComplete) {
                    checkNumberInBoard(number, board)

                    board.hasOneComplete = hasOneCompleteRow(board) || hasOneCompleteColumn(board)

                    if (board.hasOneComplete) {
                        if (!winner.board) {
                            winner.board = board
                            winner.latestNumber = number
                            winner.unmarkedSum = getUnmarkedSum(winner.board)

                            console.log('All boards:')
                            logBoards(boards)

                            console.log('\nWinner board:')
                            logBoard(winner.board)
                        } else if (lastWinner.board !== board) {
                            lastWinner.board = board
                            lastWinner.latestNumber = number
                            lastWinner.unmarkedSum = getUnmarkedSum(lastWinner.board)
                        }
                    }
                }
            })
        }

        console.log('Score:', {
            latestNumber: winner.latestNumber,
            unmarkedSum: winner.unmarkedSum,
            score: winner.latestNumber * winner.unmarkedSum,
        })

        console.log('\nlast winner board:')
        logBoard(lastWinner.board)

        console.log('Score:', {
            latestNumber: lastWinner.latestNumber,
            unmarkedSum: lastWinner.unmarkedSum,
            score: lastWinner.latestNumber * lastWinner.unmarkedSum,
        })
    } else {
        console.log(err)
    }
})
