export async function fetchData(endpoint){
    let response = await fetch(`https://tap-web-1.herokuapp.com/topics${endpoint}`);
    let data = await response.json();
    return data
}