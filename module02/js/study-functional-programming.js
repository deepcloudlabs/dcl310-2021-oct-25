// Higher-order function -> sort
// Pure function -> function(x,y){return x-y;} -> has no side-effect
numbers = [4,8,15,16,23,42]
sum = 0;
for (let number of numbers){
    if (number % 2 == 0){
        let squared = number * number;
        sum += squared;
    }
}
console.log(sum) // 2100
numbers.filter(function(x){return x%2==0}) // [4, 8, 16, 42]
numbers.filter(function(x){return x%2==0}).map(function(u){return u*u;})// [16, 64, 256, 1764]
numbers.filter(function(x){return x%2==0}).map(function(u){return u*u;}).reduce(function(sum,num){return sum+num},0) // 2100
numbers.filter((x)=>{return x%2==0}).map((u)=>{return u*u;}).reduce((sum,num)=>{return sum+num},0)// 2100
numbers.filter(x=>{return x%2==0}).map(u=>{return u*u;}).reduce((sum,num)=>{return sum+num},0) // 2100
let even = x=>x%2==0
let squared = u=>u*u
let add = (sum,num)=>sum+num
numbers.filter(even).map(squared).reduce(add,0) // 2100