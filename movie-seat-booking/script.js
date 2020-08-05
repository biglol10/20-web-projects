// querySelector 는 특정 name 이나 id 를 제한하지않고 css선택자를 사용하여 요소를 찾습니다.
// (.section) -> section 클래스명을 가진 요소를 찾습니다
// 반환객체는 한개의 요소만 찾을수있으며 동일한 클래스명 을 가진 객체가 있을경우 html문서내의 첫번째를 나타나는 요소를 반환합니다.
// SELECT they're all puts it grabs all of them and puts them into what's called the node list which is
// very similar to an array we can actually run methods on it as if it were an array where query selector

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value; // put + to make string to int

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Copy selected seats into arr
  // Map through array
  // return a new array indexes
  //   const seatsIndex = [...selectedSeatsCount]; // the spread operator copies the elements of an array... [...selectedSeatsCount, 4, 5] is also available
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);

  // local storage is pretty easy to use it just lets you stores store Strings in the browser. Retains its value even if you reload page
  // localStorage.setItem('name','Brad');
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  console.log(localStorage);

  //   console.log(selectedSeats);
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log(selectedSeats);

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        // checking for something in an array using index of an it's not there it gives us negative one.
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  console.log(e.target.selectedIndex, e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    console.log(e.target);
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Initial count and total set
updateSelectedCount();
