
const movieSearchUrl = `https://api.themoviedb.org/3/search/movie`
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing`;
const movieImageUrl = `https://api.themoviedb.org/3/movie`;
const apiKey="26a6ca6a064e61eeb4b31ebf6a5a3c01";
//const apiUrl=" https://api.themoviedb.org/3/search/movie/now_playing"
const movieArea= document.getElementById('movies-grid');
var currentSearchTerm='';
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const showMeMoreBtn = document.getElementById('load-more-movies-btn');

const closeBtn= document.getElementById('close-search-btn');
const IMGPATH= `https://image.tmdb.org/t/p/w1280`;
var currentApiPage=1;
async function nowplaying(){
    const response = await fetch(nowPlayingUrl + "?api_key=" + apiKey+"&page="+currentApiPage);
    const jsonResponse = await response.json();
   
   console.log(jsonResponse);
    displayResults(jsonResponse); 
    return jsonResponse;
}
function displayResults(data) {

    const movieString = data.results.map((data) => `
    
    <div class="movie-card">
    <img class="movie-poster" src=  "https://images.tmdb.org/t/p/w500${data.poster_path}" >
 
        <div class="movie-title"> "${data.title}</div>
      
  <div class="movie-votes">"${data.vote_count} </div>
  </div> 
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

  closeBtn.classList.remove('hidden');
}

async function handleFormSubmit(event) {
    event.preventDefault();
    movieArea.innerHTML = '';
    const currentSearchTerm = searchInput.value;
    const results = await getdata(currentSearchTerm);
    displayResults(results);
    searchInput.value = '';
    currentApiPage++;
}

searchForm.addEventListener('submit', handleFormSubmit);


async function handleShowMeMoreClick(event) {
    event.preventDefault();
    currentApiPage++;
    const res = await nowplaying();
    //const results = await getdata(currentSearchTerm);
console.log(res);
    displayResults(res);
    
}

showMeMoreBtn.addEventListener('click', handleShowMeMoreClick);


async function closeButton(event) {
    event.preventDefault();
    //currentApiPage++;
    const res = await getdata(currentSearchTerm);
    
    movieArea.innerHTML =" ";
    
}

closeBtn.addEventListener('click', closeBtn);












