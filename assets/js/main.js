import { theme, showFav } from "./header.js";
import { getRating } from "./rating.js";
theme();
showFav();
let courses;
let allCards;
let loading = document.getElementById("loading");

// Fetch Data Function
function getData() {
  loading.classList.add("show");
  fetch("https://tap-web-1.herokuapp.com/topics/list")
    .then(function (response) {
      if (!response.ok) {
        // loading.classList.add('hide');
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      courses = data;
      loading.classList.add("hide");
      displayData(courses);
    })
    .then(() => {
      getCards();
    })
    .catch(function (error) {
      // console.log("There was a problem with the fetch operation:", error);
      loading.classList.add("hide");
      document.getElementById("box-msg").style.display = "block";
    });
}

getData();

function displayData(courses) {
  let courseContent = ``;
  courses.map((course) => {
    let rating = getRating(course);
    courseContent += `
    <div class="course-box" id="${course.id}">
        <img src="assets/imgs/courses/${course.image}" alt="">
        <div class="course-box-text">
            <div class = "courses-headings">
                <h2 class="">
                ${course.category}
                </h2>
                <h3><a href = "">
                ${course.topic}
    </a></h3>
        </div>
        <div class="stars">
            ${rating}
        </div>
        <p class="capitalize">author: ${course.name}</p>
        </div>
    </div>
    `;
  });
  document.getElementById("courses-content").innerHTML = courseContent;
}

function getCards() {
  allCards = document.querySelectorAll(".course-box");
  allCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      let cid = card.getAttribute("id");
      location.href = `details.html?id=${cid}`;
    });
  });
}
