
const movieSearchUrl = `https://api.themoviedb.org/3/search/movie`
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing`;
const movieImageUrl = `https://api.themoviedb.org/3/movie`;
const apiKey="26a6ca6a064e61eeb4b31ebf6a5a3c01";
//const apiUrl=" https://api.themoviedb.org/3/search/movie/now_playing"
const movieArea= document.getElementById('movieArea');
var currentSearchTerm='';
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const showMeMoreBtn = document.getElementById('showMeMoreBtn');
const IMGPATH= `https://image.tmdb.org/t/p/w1280`;
var currentApiPage=1;
async function nowplaying(){
    const response = await fetch(nowPlayingUrl + "?api_key=" + apiKey);
    const jsonResponse = await response.json();
   // return jsonResponse.data;
    displayResults(jsonResponse); 

}
function displayResults(data) {

    movieArea.innerHTML =" ";
    const movieString = data.results.map((data) => `
    
    <div class="movie">
    <img src=  "https://images.tmdb.org/t/p/w500${data.poster_path}" >
  </div> 
        <div class="title"> "${data.title}</div>
        <div class="imageInfo">"${data.overview}</div>
        <div class="rating">"${data.vote_count} </div>
    </div>

    `).join('');

    movieArea.innerHTML= movieArea.innerHTML+movieString;
    

}

window.onload=()=>{
            
    nowplaying();
    

}
    

async function getdata(searchTerm){
 
    
    const response = await  fetch(movieSearchUrl + "?api_key=" + apiKey + "&query=" + searchTerm+"&page="+currentApiPage);
    const jsonResponse = await response.json();
    console.log( jsonResponse);
    return jsonResponse;

}


async function handleFormSubmit(event) {
    event.preventDefault();
   // movieArea.innerHTML = '';
    const currentSearchTerm = searchInput.value;
    const results = await getdata(currentSearchTerm);
    displayResults(results);
    searchInput.value = '';
    currentApiPage++;
  // showMeMoreBtn.classList.remove('hidden');
}

searchForm.addEventListener('submit', handleFormSubmit);


async function handleShowMeMoreClick(event) {
    currentApiPage++;
    const results = await getdata(currentSearchTerm);
    displayResults(results);
    
}

showMeMoreBtn.addEventListener('click', handleShowMeMoreClick);

/*
async function handleShowMeMoreClick(event) {
    currentApiPage++;
    const results = await getdata(currentSearchTerm);
  
    displayResults(results);
 
}

showMeMoreBtn.addEventListener('click', handleShowMeMoreClick); 




*/











