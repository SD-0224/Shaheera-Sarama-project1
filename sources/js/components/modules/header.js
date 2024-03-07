// Theme Function
export function theme() {
  let themeButton = document.getElementById("theme");
  let themeText = document.getElementById("themeText");

  // Check localStorage for theme preference
  if (localStorage.getItem("theme") === "dark") {
    apply("dark");
  } else {
    apply("light");
  }

  // Event listener for clicking the "dark" element
  themeButton.addEventListener("click", (e) => {
    e.preventDefault();

    // Toggle theme between light and dark
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      apply("light");
    } else {
      localStorage.setItem("theme", "dark");
      apply("dark");
    }
  });

   // apply theme function
  function apply(theme) {
    let root = document.documentElement;
    if (theme == "dark") {
      root.style.setProperty("--brand-primary", "#0768AC");
      root.style.setProperty("--brand-secondary", "#03C180");
      root.style.setProperty("--bg-default", "#1A1A1A");
      root.style.setProperty("--bg-body", "#282828");
      root.style.setProperty("--lines-color", "#000000");
      root.style.setProperty("--body-text", "#EDEDED");
      root.style.setProperty("--heart-color", "#DC143C");
      themeText.innerHTML = "Light Mode";
    } else {
      root.style.setProperty("--brand-primary", "#0768AC");
      root.style.setProperty("--brand-secondary", "#03C180");
      root.style.setProperty("--bg-default", "#FFF");
      root.style.setProperty("--bg-body", "#F0F9FF");
      root.style.setProperty("--lines-color", "#DDD");
      root.style.setProperty("--body-text", "#333");
      root.style.setProperty("--heart-color", "#DC143C");
      themeText.innerHTML = "dark Mode";
    }
  }

// check for user default system
  if (!localStorage.getItem("theme")) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      
      apply("dark");
    } else {
      apply("light");
    }
  }
}

// Fav Pannel slides Function
export function showFav(){
    $('#favButton').click((e)=>{
      e.preventDefault();
      $('#favourites').slideToggle(1000)
    })
}