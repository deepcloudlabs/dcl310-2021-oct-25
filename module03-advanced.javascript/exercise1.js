function Musteri(firstname,lastname,birthYear) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthYear = birthYear;
}

class Customer { // syntactic sugar
    constructor(firstname,lastname,birthYear) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthYear = birthYear;
    }
}

let customers = [
    new Customer("jack","bauer", 1965),
    new Customer("kate","austen", 1985),
    new Customer("james","sawyer", 1982),
    new Customer("ben","linus", 1958),
    new Customer("jin","jwon", 1988),
    new Customer("sun","jwon", 1984)
]
for (let i=0;i<customers.length;++i){ // 1
    let customer = customers[i];
    console.log(`${customer.lastname}, ${customer.firstname}`) // ES6
}

for (let i in customers){ // 2
    let customer = customers[i];
    console.log(`${customer.lastname}, ${customer.firstname}`) // ES6
}

for (let customer of customers){ // 3
    console.log(`${customer.lastname}, ${customer.firstname}`) // ES6
}
// functional programming
function for_each(items,action){
    for (let item of items){
        action(item);
    }
}
customers.sort((c1,c2)=>c1.birthYear-c2.birthYear)
for_each(customers,cust =>console.log(`${cust.lastname}, ${cust.firstname}: ${2021-cust.birthYear}`))
customers.sort((c1,c2)=>c1.lastname.toLowerCase().localeCompare(c2.lastname.toLowerCase()))
for_each(customers,cust =>console.log(`${cust.lastname}, ${cust.firstname}: ${2021-cust.birthYear}`))
