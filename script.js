

const movieSearchUrl = "https://api.themoviedb.org/3/search/movie"
const nowPlayingUrl = "https://api.themoviedb.org/3/search/movie/now_playing";
const movieImageUrl = "https://api.themoviedb.org/3/movie";
const apiKey="26a6ca6a064e61eeb4b31ebf6a5a3c01";
//const apiUrl=" https://api.themoviedb.org/3/search/movie/now_playing"
const movieArea= document.getElementById('movieArea');
var currentSearchTerm='';
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const IMGPATH= "https://image.tmdb.org/t/p/w1280";
/*
window.onload=function(){
const moviedisplay=document.querySelector('movieArea');
    moviedisplay.addEventListener(`show`, ()=>{
        const dis=moviedisplay.value;
        
        nowplaying(dis);
    });
} 
*/
function nowplaying(nowPlayingUrl){
var result=fetch(nowPlayingUrl + "?api_key=" + apikey).then(response => response.json())
  .then(data => console.log(data));
  console.log(result);
}
async function getdata(searchTerm){
 
    
//const offset = currentApiPage * pageSize;
const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key= ${apiKey}&q=${searchTerm}`).then(response => response.json())
  .then(data => console.log(data));
  return response;

}

function generateHTML(movies){
movies.foreach(data=>{
    const  movieTitle=document.createElement('p');
    movieTitle.innerHTML=`${data.original_title}`;
  const  movieRating=document.createElement('p');
    movieRating.innerHTML=`${data.original_Rating}`;
    movieTitle.append(movieTitle);
    movieRating.append(movieRating);
});
movieArea.innerHTML=output;
}
async function handleFormSubmit(event) {
    event.preventDefault();
   // movieArea.innerHTML = '';
    currentSearchTerm = searchInput.value;
    const results = await getdata(currentSearchTerm);
    generateHTML(results);
    searchInput.value = '';
    currentApiPage++;
    showMeMoreBtn.classList.remove('hidden');
}

searchForm.addEventListener('submit', handleFormSubmit);

function formSubmit(ev){
    var formel=document.querySelector("form");
    formel.addEventListener("submit",(ev)=>{
        console.log(ev.target.searchTerm.value);
        getdata(ev.target.searchTerm.value);
    });
}
const movieAr=document.querySelector('movieArea');
movieAr.addEventListener(`submit`,formSubmit(onclick))

function generateMore(movie){
    return '<img src="${movie.img}">
            <span>${movie.name}</span>
            <span>${movie.rating}</span> 
            ' 

}




/*
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
            <img src="https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg" />
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
*/