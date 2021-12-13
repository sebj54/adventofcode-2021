const fs = require('fs')

const filePath = './input.txt'

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
        // Part one
        const inputs = data.trim().split('\n')
        const lines = inputs.length
        const sums = new Array(inputs[0].length)

        sums.fill(0)

        inputs.forEach((input) => {
            input.split('').forEach((bit, index) => {
                sums[index] += Number(bit)
            })
        })

        const mostCommonBits = sums.reduce((acc, cur) => {
            return `${acc}${cur > (lines / 2) ? 1 : 0}`
        }, '')
        const leastCommonBits = sums.reduce((acc, cur) => {
            return `${acc}${cur > (lines / 2) ? 0 : 1}`
        }, '')

        const gammaRate = parseInt(mostCommonBits, 2)
        const epsilonRate = parseInt(leastCommonBits, 2)

        console.log({
            mostCommonBits,
            leastCommonBits,
            gammaRate,
            epsilonRate,
            consumption: gammaRate * epsilonRate,
        })

        // Part two
        let oxygenGeneratorRating
        let co2ScrubberRating
        let oxygenSearchString = mostCommonBits.slice(0, 1)
        let co2SearchString = leastCommonBits.slice(0, 1)

        let filteredInputs = inputs

        while (!oxygenGeneratorRating && oxygenSearchString.length < mostCommonBits.length) {
            filteredInputs = filteredInputs.filter(input => input.startsWith(oxygenSearchString))

            if (filteredInputs.length === 1) {
                oxygenGeneratorRating = parseInt(filteredInputs[0], 2)
            } else {
                const currentIndex = oxygenSearchString.length
                const mostCommonBitAtPosition = filteredInputs.reduce((acc, cur) => {
                    return acc + Number(cur[currentIndex])
                }, 0) >= (filteredInputs.length / 2) ? 1 : 0

                oxygenSearchString += mostCommonBitAtPosition
            }
        }

        filteredInputs = inputs

        while (!co2ScrubberRating && co2SearchString.length < mostCommonBits.length) {
            filteredInputs = filteredInputs.filter(input => input.startsWith(co2SearchString))

            if (filteredInputs.length === 1) {
                co2ScrubberRating = parseInt(filteredInputs[0], 2)
            } else {
                const currentIndex = co2SearchString.length
                const leastCommonBitAtPosition = filteredInputs.reduce((acc, cur) => {
                    return acc + Number(cur[currentIndex])
                }, 0) >= (filteredInputs.length / 2) ? 0 : 1

                co2SearchString += leastCommonBitAtPosition
            }
        }

        console.log({
            oxygenGeneratorRating,
            c02ScrubberRating: co2ScrubberRating,
            lifeSupportRating: oxygenGeneratorRating * co2ScrubberRating,
        })
    } else {
        console.log(err)
    }
})
