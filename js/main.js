$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val().trim();
        getMovies(searchText);
        e.preventDefault();

        console.log(searchText);
    });
});

/**
 * Filmek lekérése a végpontról
 */
function getMovies(searchText) {
    //api end point http://www.omdbapi.com?apikey=7cd438f3

    axios.get('http://www.omdbapi.com?apikey=7cd438f3&s=' + searchText)
        .then((res) => {
            let movies = res.data.Search; 
            let output = '';

            $.each(movies, (index, movie) => {
                output += `
                    <article class="col-md-3 m-3">
                        <div class="text-center">
                            <img src="${movie.Poster}" alt="${movie.Title}">
                            <h5 class="mt-2 text-small">${movie.Title}</h5>
                            <a class="btn btn-light" href="#" onclick="selectMovie('${movie.imdbID}')">Részletek</a>
                        </div>
                    </article>
                `;
                console.log(movie);
            });

            $('#movies').html(output);
            //console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
}
/**
 * a részletek gomb --> sessionStorageben --> show.html
 */
function selectMovie(movieID){
    sessionStorage.setItem('movieID', movieID);
    window.location = 'show.html';
    return false;
}

/**
 * Egy film betöltése
 */
function getMovie() {
    let movieID = sessionStorage.getItem('movieID');
    //console.log(movieID);
    axios.get('http://www.omdbapi.com?apikey=7cd438f3&i=' + movieID)
        .then( res => {
            console.log(res);
            let movie = res.data;

            let output = `
                <article class="movie-box row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail" alt="${movie.Title}">
                    </div>
                    <div class="col-md-8">
                        <h2 class="mt-2 text-small">${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><b>Released:</b> ${movie.Released}</li>
                        </ul>
                        <div class="imdb-link">
                            <h3>Leírás</h3>
                            <p>${movie.Plot}</p>
                            <hr>
                            <a href="https://imdb.com/title/${movie.imdbID}" class="btn btn-light" target="_blank">Nézzük meg IMDB-n</a>
                            <a href="index.html" class="btn btn-primary">vissza a keresőhöz</a>
                        </div>

                    </div>
                </article>
            `;

            $('#movie').html(output);
        })
        .catch(error => {
            console.log(error);
        })
}


