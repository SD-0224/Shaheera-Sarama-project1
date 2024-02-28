import { getRating } from "./rating.js";
let favPannel;
if(localStorage.getItem('favCourses')){
    favPannel = JSON.parse(localStorage.getItem('favCourses'));
    if(favPannel.length > 0){
        let FavContent = ``;
        favPannel.map((fav)=>{
            let rating = getRating(fav);
            FavContent+=`
                <div class="favourites-content-box">
                    <img src="assets/imgs/courses/${fav.image}" alt="">
                    <div class="favourites-text">
                        <h3 class="capitalize">${fav.topic}</h3>
                        <div class="stars">
                            ${rating}
                        </div>
                    </div>
                </div>
            `
        })
        document.getElementById('favContent').innerHTML = FavContent;
    }
}
else{
    document.getElementById('favContent').innerHTML = "You Don not have any Favourite Courses yet!";
}
