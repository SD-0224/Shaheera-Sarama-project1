import { getRating } from "./rating.js";
let allCourses;
await getAll();
async function getAll(){
    let response = await fetch(`https://tap-web-1.herokuapp.com/topics/list`);
    let data = await response.json();
    allCourses = data;
}
// console.log('all',allCourses);
// get everything after ?
let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let loading = document.getElementById("loading");
let singleCourse;
await getSingleCourse(id);

async function getSingleCourse(id) {
  fetch(`https://tap-web-1.herokuapp.com/topics/details/${id}`)
    .then(function (response) {
      if (!response.ok) {
        // loading.classList.add('hide');
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      singleCourse = data;
      loading.classList.add("hide");
      displayCourseDetails(singleCourse);
      displayCourseTable(singleCourse);
    })
    .then(()=>{
        checkForFav();
        addTofav();
    })
    .catch(function (error) {
      // console.log("There was a problem with the fetch operation:", error);
      loading.classList.add("hide");
      document.getElementById("box-msg").style.display = "block";
    });
}

function displayCourseDetails(singleCourse) {
  let rating = getRating(singleCourse);
  let content = `
    <div class="course-details-text">
    <h2>${singleCourse.category}</h2>
    <h3>${singleCourse.topic}</h3>
    <div class="stars">
        ${rating}
    </div>
    <p class="course-desc">
        ${singleCourse.description}
    </p>
</div>

<div class="course-detail-box">
<img src="assets/imgs/courses/${singleCourse.image}" alt="">
<div class="course-detail-box-content">
    <p class="author"><span>${singleCourse.topic}</span> by <a href="" class="capitalize">${singleCourse.name}</a></p>
    <div class="course-detail-box-fav">
        <p id="alredyFav"><span class="capitalize">i</span>ntreseted about this topic?</p>
        <a href="" class="capitalize" id="addTofav" courseId ="${singleCourse.id}">add to favourite <ion-icon name="heart-outline" role="img"
                class="md hydrated"></ion-icon></a>
        <p class="cred capitalize">unlimted credits</p>
    </div>
</div>
</div>
</div>
    `;

  document.getElementById("course-datails").innerHTML = content;
}

function displayCourseTable(singleCourse) {
  let subs = singleCourse.subtopics;
  let content = `
    <div>
            <h4 class="capitalize"> <span>${
              singleCourse.topic
            }</span> sub topics</h4>
            <ul>
            ${subs
              .map(
                (sub) => `
              <li>
                  <ion-icon name="checkmark-circle-outline"></ion-icon>
                  <a href="">${sub}</a>
              </li>`
              )
              .join("")}
              </ul>
              </div>
              `;

  document.getElementById("table-content").innerHTML = content;
}

let favourites;
function checkForFav(){
  if(!localStorage.getItem('favCourses')){
    favourites = [];
  }
  else{
    favourites = JSON.parse(localStorage.getItem('favCourses'));
    let check = favourites.find((fav) => fav.id == id);
    if(check){
      document.getElementById('addTofav').style.display = 'none'
      document.getElementById('alredyFav').innerHTML = 'Already your favourite !'
      // alert(id)
    }
  }
}
async function addTofav(){
    document.getElementById('addTofav').addEventListener('click',(e)=>{
        e.preventDefault();
        let id = e.target.getAttribute('courseId');
        let favCourse = allCourses.find((course)=> course.id == id );
        let duplicate = favourites.find((fav) => fav.id == favCourse.id)
        if(!duplicate){
          favourites.push(favCourse);
          location.reload();
        }
        localStorage.setItem('favCourses', JSON.stringify(favourites))
    }) 
}

