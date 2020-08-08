// function calculate() {
//   // fetch('items.json',{
//   //     method: 'POST',
//   //     headers:{
//   //         'Content-Type: application/json'
//   //     }
//   // })
//   fetch("items.json")
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }

// calculate();

const currentcyEl_one = document.getElementById("currency-one");
const currentcyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  console.log("RAN");
  const currency_one = currentcyEl_one.value;
  const currency_two = currentcyEl_two.value;

  console.log(currency_one, currency_two);
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2); // to decimal
    });
}

// Event listeners
currentcyEl_one.addEventListener("change", calculate);
currentcyEl_two.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currentcyEl_one.value;
  currentcyEl_one.value = currentcyEl_two.value;
  currentcyEl_two.value = temp;
  calculate();
});

calculate();
