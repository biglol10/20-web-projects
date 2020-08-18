const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  // One way
  //   fetch(`${apiURL}/suggest/${term}`)
  //     .then((res) => res.json()) //with the fetch API we get back the response but we also have to basically format it to Jason
  //     .then((data) => console.log(data));

  // Another way (add async)
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}

// Show song and artist in DOM
// first way
// function showData(data) {
//   let output = "";
//   data.data.forEach((song) => {
//     output += `
//             <li>
//                 <span><strong>${song.artist.name}</strong> - ${song.title}</span>
//                 <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
//             </li>
//         `;
//   });
//   result.innerHTML = `
//     <ul class="songs">
//         ${output}
//     </ul>
//   `;
// }

// Another way
function showData(data) {
  result.innerHTML = `
        <ul class="songs">
            ${data.data
              .map(
                (song) => `
            <li>
             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
             <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
            </li>
            `
              )
              .join("")}
        </ul>
    `; // use join to make it into string

  if (data.prev || data.next) {
    more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ""
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ""
        }
      `;
  } else {
    more.innerHTML = "";
  }
}

// Get prev and next songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

// So what's happening here is we're getting this cause error here.
// So cause is it has to do with allowing cross domain access to a server and every server every API has
// different cause policies some are closed where you actually you have to be on that same domain to access
// the data.
// Some are completely open.
// In this case it allows us to make the initial request to get these you know these songs here.
// But then when we try to get the next songs with the next U.R.L. we get this cause error.
// Now there's a way around this and that's to use a proxy.
// There's actually there's a few things we can do but I think one of the easiest things in the situation
// is to use a proxy and Heroku which is a hosting platform has a cause proxy.

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
        <h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>${lyrics}</span>
    `;
  }

  more.innerHTML = ``;
}

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
result.addEventListener("click", (e) => {
  console.log(e.target);
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    getLyrics(artist, songTitle);
  }
});
