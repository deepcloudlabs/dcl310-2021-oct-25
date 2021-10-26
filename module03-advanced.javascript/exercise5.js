// generator function
function* filtrele(items, predicate){
    for (let item of items){
        if (predicate(item))
            yield item;
    }
}

function* donustur(items, fun){
    for (let item of items){
        yield fun(item);
    }
}

function* indirge(items, fun, initial){
    let result = initial;
    for (let item of items){
        result = fun(result,item);
    }
    return result;
}

numbers = [4, 8, 15, 16, 23, 42]

function even(x) {
    console.log(`even(${x}) is called!`)
    return x % 2 == 0;
}

function take_square(x) {
    console.log(`take_square(${x}) is called!`)
    return x*x;
}

function take_sum(x,y) {
    console.log(`take_sum(${x},${y}) is called!`)
    return x+y;
}
/*
let sumOfSquareOfEvenNumbers =
numbers.filter(even)
       .map(take_square)
       .reduce(take_sum, 0);
*/
// Generator Functions:
// 1. Lazy Evaluation
// 2. Pipeline -> memory efficient -> solves functional programming's memory consumption problem
let sumOfSquareOfEvenNumbers =
    indirge(donustur(filtrele(numbers, even),take_square),take_sum, 0)
console.log(sumOfSquareOfEvenNumbers.next().value)