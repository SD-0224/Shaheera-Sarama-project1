import { fetchData } from "../modules/fetch.js";
import { getRating } from "../modules/rating.js";
let loading = document.getElementById("loading");

async function displayTopics() {
  try {
    let allCourses = await fetchData(
      "/list"
    );
    loading.classList.add("hide");
    displayData(allCourses);
  } catch {
    loading.classList.add("hide");
    document.getElementById("box-msg").style.display = "block";
  }
}
displayTopics();
function displayData(courses) {
  let courseContent = ``;
  courses.map((course) => {
    let rating = getRating(course);
    courseContent += `
    <div class="course-box" id="${course.id}">
    <a href = 'details.html?id=${course.id}'>
        <img src="assets/imgs/courses/${course.image}" alt="">
        <div class="course-box-text">
            <div class = "courses-headings">
                <h2 class="">
                ${course.category}
                </h2>
                <h3>
                ${course.topic}
</h3>
        </div>
        <div class="stars">
            ${rating}
        </div>
        <p class="capitalize">author: ${course.name}</p>
        </div>
        </a>
    </div>
    `;
  });
  document.getElementById("courses-content").innerHTML = courseContent;
}
