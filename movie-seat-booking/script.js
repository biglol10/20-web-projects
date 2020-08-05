// querySelector 는 특정 name 이나 id 를 제한하지않고 css선택자를 사용하여 요소를 찾습니다.
// (.section) -> section 클래스명을 가진 요소를 찾습니다
// 반환객체는 한개의 요소만 찾을수있으며 동일한 클래스명 을 가진 객체가 있을경우 html문서내의 첫번째를 나타나는 요소를 반환합니다.

const container = document.querySelector(".container");
const seats = document.querySelector(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.nodeValue;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}
