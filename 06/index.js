const fs = require('fs')

// const filePath = './test.txt'
const filePath = './input.txt'

const maxTimer = 9
let fishesCount

function resetFishesCount() {
    // We will store in an array the number of lanterfishes
    // The array index represents the timer (days remaining)
    // Max timer goes from 0 to 8 so we create a 9-lengthed array
    fishesCount = Array(maxTimer)
    fishesCount.fill(0)
}

function fillFishesCount(inputs) {
    inputs.forEach((input) => {
        fishesCount[input] += 1
    })
}

function decrementTimers() {
    const willCreateFishCount = fishesCount[0]

    for (let i = 1; i < maxTimer; i++) {
        fishesCount[i - 1] = fishesCount[i]
    }

    // Lanternfishes create a new fish with a timer of 8
    fishesCount[8] = willCreateFishCount

    // And thay reset their own timers to 6
    fishesCount[6] += willCreateFishCount
}

function output() {
    console.log('Lanternfishes count:')

    let total = 0

    fishesCount.forEach((count, timer) => {
        console.log(`${timer} day${timer > 1 ? 's:' : ': '} ${count}`)

        total += count
    })

    console.log(`Total: ${total}`)
}

fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
    if (!err) {
        const inputs = data.trim().split(',').map(i => Number(i))

        console.log('PART ONE')

        resetFishesCount()
        fillFishesCount(inputs)

        let days = 80
        for (let i = 0; i < days; i++) {
            decrementTimers()
        }

        output()

        console.log('PART TWO')

        resetFishesCount()
        fillFishesCount(inputs)

        days = 256
        for (let i = 0; i < days; i++) {
            decrementTimers()
        }

        output()
    } else {
        console.log(err)
    }
})
