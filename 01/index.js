const fs = require('fs')

function checkIfPrevLarger(acc, cur, curIndex, array) {
    if (curIndex > 0) {
        const prev = array[curIndex - 1]

        if (cur > prev) {
            acc += 1
        }
    }

    return acc
}

const filePath = './input.txt'

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
        const inputs = data.trim().split('\n').map(i => Number(i))

        console.log('PART ONE')
        const largerElements = inputs.reduce(checkIfPrevLarger, 0)
        console.log('[TCL] ~ file: index.js ~ line 23 ~ fs.readFile ~ largerElements', largerElements)

        console.log('PART TWO')
        const threeMeasurements = inputs.map((value, index) => {
            if (index < 2) {
                return 0
            }

            return value + inputs[index - 1] + inputs[index - 2]
        }).slice(2)

        const largerThreeMeasurements = threeMeasurements.reduce(checkIfPrevLarger, 0)
        console.log('[TCL] ~ file: index.js ~ line 35 ~ fs.readFile ~ largerThreeMeasurements', largerThreeMeasurements)
    } else {
        console.log(err)
    }
})
