console.log("Login JS is working");

const btn_element = document.getElementById("login-btn");

btn_element.addEventListener('click', function () {
    // 1. Get the number
    const inputNumber = document.getElementById("input-number");
    const contact = inputNumber.value;
    console.log(contact);
    // 2. Get the Pin
    const inputPin = document.getElementById("input-pin");
    const pin = inputPin.value;
    console.log(pin);
    // 3. Match the mobile number and pin
    if ((contact === "01713078749") && (pin === "4351")) {
        // 3.1 true:: Homepage
        window.location.assign("./home.html")
    } else {
        // 3.2 false:: alert->return
        alert("Login Failed!");
        return;
    }
})