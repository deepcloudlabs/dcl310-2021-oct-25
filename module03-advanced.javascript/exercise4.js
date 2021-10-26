function fun(x=8, y=16, z=32) {
    // x = x || 8;
    // y = y || 16;
    // z = z || 32;
    return x * y + z;
}

function gun(x, y, z) {
    for (let argument of arguments)
        console.log(argument)
    if(arguments.length !== 3)
        throw "You must provide three integers."
    return x * y + z;
}
console.log(fun()) // x,y,z -> undefined
console.log(fun(4)) // y,z -> undefined
console.log(fun(4,2)) // z -> undefined
console.log(fun(4,2,3)) // 11
console.log(fun(4,2,3,1,7,8,9)) // 11

console.log(gun(1,2,3,4,5,6,7,8,9))