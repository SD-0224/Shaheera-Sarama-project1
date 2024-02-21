let courses;

// Fetch Data Function
function getData() {
  fetch("assets/js/topics.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      courses = data;
      let singleCourse = getCourseId();
      displayCourseDetails(singleCourse);
      tableCourseContent(singleCourse);
    })
    .catch(function (error) {
      console.log("There was a problem with the fetch operation:", error);
    });
}

// Get Course Id Function
function getCourseId() {
  let cid = parseInt(localStorage.getItem("Cid"));
  let getsingleCourse = courses.find((course) => {
    return course.id == cid;
  });
  return getsingleCourse;
}
// console.log(singleCourse);

// Display the Data Function
function displayCourseDetails(singleCourse) {
  let integerPart = parseInt(singleCourse.rating);
  let decimalPart = singleCourse.rating - integerPart;
  let starHtml = "";
  for (let i = 0; i < integerPart; i++) {
    starHtml += '<ion-icon name="star"></ion-icon>';
  }
  if (decimalPart >= 0.5) {
    starHtml += '<ion-icon name="star-half-outline"></ion-icon>';
    for (let i = 4 - integerPart; i >= 1; i--) {
      starHtml += '<ion-icon name="star-outline"></ion-icon>';
    }
  } else {
    for (let i = 5 - integerPart; i >= 1; i--) {
      starHtml += '<ion-icon name="star-outline"></ion-icon>';
    }
  }
  let courseDetails = `<div class="course-details-text">
    <h2>${singleCourse.category}</h2>        
    <h3>${singleCourse.topic}</h3>   
    <div class="stars">
        ${starHtml}
    </div>
    <p class="course-desc">
    ${singleCourse.description}
    </p>
</div>

<div class="course-detail-box">
    <img src=assets/imgs/courses/${singleCourse.image} alt="">
    <div class="course-detail-box-content">
        <p class="author"><span>${singleCourse.topic}</span> by <a href="" class="capitalize">${singleCourse.name}</a></p>
        <div class="course-detail-box-fav">
            <p><span class="capitalize">i</span>ntreseted about this topic?</p>
            <a href="" class="capitalize">add to favourite <ion-icon name="heart-outline"></ion-icon></a>
            <p class="cred capitalize">unlimted credits</p>
        </div>
    </div>
</div>`;

  document.getElementById("course-datails").innerHTML = courseDetails;
}

// Display The Table Function
function tableCourseContent(singleCourse) {
  let subs = singleCourse.subtopics;
  console.log(subs);
  let tableContent = `
  <div>
    <h4 class="capitalize"> <span>${singleCourse.topic}</span> sub topics</h4>
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

  document.getElementById("table-content").innerHTML = tableContent;
  // console.log(tableContent);
}
getData();
