async function getLotteryNumbers() {
    let numbers = [];
    while (numbers.length < 6) {
        let randomNumber = Math.floor(Math.random() * 60 + 1);
        if (!numbers.includes(randomNumber))
            numbers.push(randomNumber)
    }
    numbers.sort((x, y) => x - y)
    return numbers;
}

getLotteryNumbers().then(numbers => console.log(numbers))

async function haveGun() {
    let numbers = await getLotteryNumbers();

}
x = 32;
y = 56;
z = x + y; // 88
x++; // 33
// z? reactive -> 89


