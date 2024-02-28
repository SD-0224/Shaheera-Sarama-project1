export function getRating(course){
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
      return starHtml;
  }