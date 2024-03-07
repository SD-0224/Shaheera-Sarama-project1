import { fetchData } from "../modules/fetch.js";
import { getRating } from "../modules/rating.js";
let allCourses = await fetchData("/list");  

getCats();

function getCats() {
    let uniqueCategories = new Set();
    allCourses.forEach(course => uniqueCategories.add(course.category));

    let filterContent = ``;
    uniqueCategories.forEach(category => {
        filterContent += `<option value="${category}">${category}</option>`;
    });

    document.getElementById('filter').innerHTML = `
    <option value="default">Default</option>
    ${filterContent}
    `
}


function drawingData(resCourse) {
    let courseContent = ``;
    resCourse.map((course) => {
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

/* 1 function take 3 parameter topics,sort,filter
topics => res or search 
every listenrt needd to call this function
*/


let searchInput = document.getElementById("searchInput");
let sortBy = document.getElementById("sort");
let filterSelect = document.getElementById("filter");

async function search(topic, sort, filter) {
    try {
        let result = await fetchData(`/list?phrase=${topic}`);

        if (sort !== 'default') {
            switch (sort) {
                case 'name':
                    result = result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'title':
                    result = result.sort((a, b) => a.topic.localeCompare(b.topic));
                    break;
            }
        }
        if (filter !== 'default') {
            result = result.filter(res => res.category === filter);
        }
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function applySearchFilters() {
    let keyword = searchInput.value;
    let sortValue = sortBy.value;
    let filterValue = filterSelect.value;

    let result = await search(keyword, sortValue, filterValue);
    drawingData(result);
}

searchInput.addEventListener('keyup', () => {
    applySearchFilters();
});

sortBy.addEventListener('change', () => {
    applySearchFilters();
});

filterSelect.addEventListener('change', () => {
    applySearchFilters();
});
