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
      displayData();
    })
    .catch(function (error) {
      console.log("There was a problem with the fetch operation:", error);
    });
}

getData();

// Display The Data Function
function displayData() {
  let courseContent = ``;
  courses.map((course) => {
    let integerPart = parseInt(course.rating);
    let decimalPart = course.rating - integerPart;
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
    courseContent += `
    <div class="course-box">
        <img src="assets/imgs/courses/${course.image}" alt="">
        <div class="course-box-text">
            <div class = "courses-headings">
                <h2 class="">
                ${
                  // course.category.length === 41
                  //   ? course.category.substring(0, 30).concat("...")
                  //   : course.category

                  course.category
                }
                </h2>
                <h3><a href = "details.html">
                ${
      course.topic.length === 52
        ? course.topic.substring(0, 33).concat("...")
        : course.topic
    }
    </a></h3>
        </div>
        <div class="stars">
            ${starHtml}
        </div>
        <p class="capitalize">author: ${course.name}</p>
        </div>
    </div>
    `;
  });
  document.getElementById("courses-content").innerHTML = courseContent;
}


