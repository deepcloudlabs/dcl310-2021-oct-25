function getLotteryNumbers() { //asynchronous function
    return new Promise((resolve,reject)=>{
        let numbers = [];
        while (numbers.length < 6) {
            let randomNumber = Math.floor(Math.random() * 60 + 1);
            if (!numbers.includes(randomNumber))
                numbers.push(randomNumber)
        }
        numbers.sort((x, y) => x - y)
        setTimeout(()=>{
            resolve(numbers);
        } , 5000)
    });
}

getLotteryNumbers().then(numbers => console.log(numbers))