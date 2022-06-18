

const base_url='https://www.themoviedb.org/';
const posterPath='/kqjL17yufvn9OVLyXYpvtyrFfak.jpg';
const posterImage='https://image.tmdb.org/t/p/w500';

const apiKey = '26a6ca6a064e61eeb4b31ebf6a5a3c01';
const pageSize = 1;
const API_URL= "https://api.themoviedb.org/3/search/movie/now_playing?api_key=6a6ca6a064e61eeb4b31ebf6a5a3c01"




const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieAreaDiv = document.getElementById('movieArea');
const showMeMoreBtn = document.getElementById('show-me-more-btn');

//fetch(API_URL).then(response=>response.json()).then(results=>displayResults(respd.results));
async function getmovies(url){
    const res=await fetch(url);
    const respd=await res.json();
    console.log(respd);
    displayResults(respd.results);

}
async function getResults(searchTerm) {
    const offset = currentApiPage * pageSize;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&q=${searchTerm}`);
    const jsonResponse = await response.json();
    return jsonResponse.data;
}

function displayResults(results) {
    const movieString = results.map(gif => `
        <div class="movie">
            <img src="${posterImage+posterPath}" />
        </div>
        <div class="title"> "${title}</div>
        <div class="imageInfo">"${imageInfo}</div>
        <div class="rating">"${rating} </div>
    </div>

    `).join('');

    movieArea.innerHTML = movieArea.innerHTML + movieString;
}



async function handleFormSubmit(event) {
    event.preventDefault();
    movieArea.innerHTML = '';
    currentSearchTerm = searchInput.value;
    const results = await getResults(currentSearchTerm);
    const output = await getmovie(currentSearchTerm);
    displayResults(results);
    displayResults(output);
    searchInput.value = '';
    currentApiPage++;
    showMeMoreBtn.classList.remove('hidden');
}

searchForm.addEventListener('submit', handleFormSubmit);

async function handleShowMeMoreClick(event) {
    const results = await getResults(currentSearchTerm);
    displayResults(results);
    currentApiPage++;
}

showMeMoreBtn.addEventListener('click', handleShowMeMoreClick); 
window.onload=function(){
    getmovies(API_URL);
}