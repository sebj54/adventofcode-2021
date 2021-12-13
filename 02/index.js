const fs = require('fs')

const filePath = './input.txt'

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
        // Part one
        let hPosition = 0
        let depth = 0

        // Part two
        let hPosition2 = 0
        let depth2 = 0
        let aim = 0

        const inputs = data.trim().split('\n').map((input) => {
            const [direction, amount] = input.split(' ')

            return {
                direction,
                amount: Number(amount),
            }
        })

        inputs.forEach(({ direction, amount }) => {
            switch (direction) {
                case 'forward':
                    // Part one
                    hPosition += amount

                    // Part two
                    hPosition2 += amount
                    depth2 += aim * amount
                    break

                case 'up':
                    // Part one
                    depth -= amount

                    // Part two
                    aim -= amount
                    break

                case 'down':
                    // Part one
                    depth += amount

                    // Part two
                    aim += amount
                    break

                default:
                    console.log('[TCL] ~ file: index.js ~ line 37 ~ inputs.forEach ~ direction, amount', direction, amount)
                    break
            }
        })

        console.log('PART ONE', {
            hPosition,
            depth,
            factor: hPosition * depth,
        })

        console.log('PART TWO', {
            hPosition: hPosition2,
            depth: depth2,
            aim,
            factor: hPosition2 * depth2,
        })
    } else {
        console.log(err)
    }
})
