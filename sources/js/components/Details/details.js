import { fetchData } from "../modules/fetch.js";
import { getRating } from "../modules/rating.js";
import { getFav } from "../modules/fav.js";

// get url id
let urlParams = new URLSearchParams(window.location.search);
let cid = urlParams.get("id");

let loading = document.getElementById("loading");
let singleCourse;
let favourites;

await getSingleCourse(cid);
gerFavLocal();
addTofav();
async function getSingleCourse(cid) {
    try{
        singleCourse = await fetchData(`/details/${cid}`);
        loading.classList.add('hide');
        displayCourseDetails(singleCourse);
        displayCourseTable(singleCourse);
    }
    catch{
        loading.classList.add("hide");
        document.getElementById("box-msg").style.display = "block";
    }
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


function gerFavLocal(){
  if(!localStorage.getItem('favCourses')){
    favourites = [];
  }
  else{
    favourites = JSON.parse(localStorage.getItem('favCourses'));
    // console.log('fav',favourites);
    let check = favourites.find((fav) => fav.id == singleCourse.id);
    if(check){
        document.getElementById('addTofav').style.display = 'none'
        document.getElementById('alredyFav').innerHTML = 'Already your favourite !'
    }

  }
}
async function addTofav(){
    document.getElementById('addTofav').addEventListener('click',(e)=>{
        e.preventDefault();
        let id = e.target.getAttribute('courseId');
        let favCourse = singleCourse;
        let duplicate = favourites.find((fav) => fav.id == favCourse.id)
        if(!duplicate){
        favourites.push(favCourse);
        document.getElementById('addTofav').style.display = 'none'
        document.getElementById('alredyFav').innerHTML = 'Already your favourite !'
        localStorage.setItem('favCourses', JSON.stringify(favourites));
        getFav();
        $('#favourites').slideToggle(1000);
        }   
    }) 
}
