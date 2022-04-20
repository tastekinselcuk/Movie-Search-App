let movies = [
    {
      title: "The Man From Earth 1",
      description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
      poster: //database'den poster olarak geldiği için yazıldı
        "https://unutulmazfilmler.pw/wp-content/uploads/2016/07/The-Man-from-Earth.jpg",
      isFavourite: true
    },
    {
      title: "The Man From Earth 2",
      description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
      poster:
        "https://unutulmazfilmler.pw/wp-content/uploads/2016/07/The-Man-from-Earth.jpg",
      isFavourite: false
    },
    {
      title: "The Man From Earth 3",
      description: `John üniversiteden ayrılıp, başka bir yere gitmeye karar vermiş, akademisyen arkadaşları da ona veda etmek için evine gelmişlerdir. Arkadaşları John'u kalması için ikna etmeye çalışırken, John büyük sırrını ortaya dökecek ve herkesi büyük bir şaşkınlığa sürükleyecekti`,
      poster:
        "https://unutulmazfilmler.pw/wp-content/uploads/2016/07/The-Man-from-Earth.jpg",
      isFavourite: false
    }
  ];

  const search_text = document.querySelector(".search_text");
  search_text.addEventListener("keydown",event =>{
    if(event.keyCode == 13){
      searchMovie();
    }
  });

  //sorgu atma..
  async function searchMovie(){
    const request = await fetch(`http://www.omdbapi.com/?apikey=e77ddb46&s=${search_text.value}`);
    const data = await request.json();
    console.log("Data",data);
    let movies = data.Search.map(m => {
      return {
        title : m.Title,
        description : `${m.Year}/${m.Type}`,
        imdbID : m.imdbID,
        poster : m.Poster == "N/A" ? "assets/image/default.png" : m.Poster,
        isFavourite : false
      }
    })
    prepareMovies(movies);
  }

// Poster: "https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_SX300.jpg"
// Title: "Captain Marvel"
// Type: "movie"
// Year: "2019"
// imdbID: "tt4154664"

  //filmleri hazırla...
  function prepareMovies(movies){ //dinamik olarak <movie-card/> oluşturulacak
    document.querySelector("#movies").innerHTML = "";
    movies.forEach(movie => { //movies'i don herbir elemanını movie'ye aktar dedik
      let movie_card = document.createElement("movie-card");
      movie_card.setAttribute("title",movie.title);
      movie_card.setAttribute("poster",movie.poster);
      movie_card.setAttribute("isFavourite", movie.isFavourite);
      movie_card.setAttribute("imdbID", movie.imdbID);
      movie_card.innerHTML = movie.description;
      document.querySelector("#movies").append(movie_card);
    });

  }

  //prepareMovies(movies)