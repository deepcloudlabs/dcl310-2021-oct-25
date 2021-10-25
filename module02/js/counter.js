// JS supports:
// 1. OOP
// 2. FP -> setInterval accepts function, setInterval: higher-order function
// 3. Asynchronous Function: setInterval is an async function
// 4. JS Engine -> VM -> Single Execution Thread
// 5. Event-Triggered -> Event Queue -> Single Execution Thread
window.onload = function(){ // callback function + sync
    let counter = 0;
    let spanElement = document.querySelector("#counter"); // DOM
    setInterval(function(){ // Timeout Event -- triggers --> callback function
        counter++;
        spanElement.innerHTML = counter.toString();
    } , 1000);
};
