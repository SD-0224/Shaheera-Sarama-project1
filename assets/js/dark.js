let dark = document.getElementById('dark');

// Check localStorage for theme preference
if (localStorage.getItem('theme') === 'dark') {
    applyDarkTheme();
}

// Event listener for clicking the "dark" element
document.getElementById("dark").addEventListener("click", (e) => {
    e.preventDefault();

    // Toggle theme between light and dark
    if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
        applyLightTheme();
    } else {
        localStorage.setItem('theme', 'dark');
        applyDarkTheme();
    }
});

// Function to apply dark theme
function applyDarkTheme() {
    let root = document.documentElement;
    root.style.setProperty("--brand-primary", "#0768AC");
    root.style.setProperty("--brand-secondary", "#03C180");
    root.style.setProperty("--bg-default", "#1A1A1A");
    root.style.setProperty("--bg-body", "#282828");
    root.style.setProperty("--lines-color", "#000000");
    root.style.setProperty("--body-text", "#EDEDED");
    root.style.setProperty("--heart-color", "#DC143C");
}

// Function to apply light theme
function applyLightTheme() {
    let root = document.documentElement;
    root.style.setProperty("--brand-primary", "#0768AC");
    root.style.setProperty("--brand-secondary", "#03C180");
    root.style.setProperty("--bg-default", "#FFF");
    root.style.setProperty("--bg-body", "#F0F9FF");
    root.style.setProperty("--lines-color", "#DDD");
    root.style.setProperty("--body-text", "#333");
    root.style.setProperty("--heart-color", "#DC143C");
}

