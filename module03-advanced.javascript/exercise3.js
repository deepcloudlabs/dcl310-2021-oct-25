class Customer { // syntactic sugar
    constructor(firstname,lastname,birthYear) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthYear = birthYear;
    }
}

let jack = new Customer("jack","bauer", 1965)
/*
    firstname = jack.firstname;
    lastname = jack.lastname;
 */
let {firstname,lastname}= jack;

let x = 0;
let y = 1;
let radius = 100;
let circle1 = {"x": x, "y": y, "radius": radius};
let circle2 = {x, y, radius};

// object cloning
jack = new Customer("jack","bauer",1956)
cust = {...jack} // cloning
cust.birthYear = 2000 // {firstname: 'jack', lastname: 'bauer', birthYear: 2000}
jack // {firstname: 'jack', lastname: 'bauer', birthYear: 1956}

// array cloning
numbers = [4,8,15,16,23,42] // [4, 8, 15, 16, 23, 42]
dizi = [...numbers] // cloning
dizi[3] = 3615
dizi    //[4, 8, 15, 3615, 23, 42]
numbers //[4, 8, 15, 16, 23, 42]

numbers = [4,8,15,16,23,42] // [4, 8, 15, 16, 23, 42]
[first, second,...rest] = numbers
first // 4
second // 8
others // [15, 16, 23, 42]

sayilar = JSON.parse(JSON.stringify(numbers))