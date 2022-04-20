const template = document.createElement("template");
template.innerHTML = `
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css");
.movie-container {
    background-color: #f4f4f4;
    width: 600px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    border: 1px solid #c00000;
    border-bottom: 3px solid #c00000;
    cursor: default;
    transition: all 0.2s;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  .movie-container:hover {
    -webkit-box-shadow: 2px 10px 5px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 10px 5px -8px rgba(0, 0, 0, 0.75);
    box-shadow: 2px 10px 5px -8px rgba(0, 0, 0, 0.75);
    transition: all 0.2s;
  }
  
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  
  .image-container img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  
  .info {
    padding: 0 10px;
    padding-bottom: 10px;
  }
  
  .info p {
    color: #666;
    text-align: justify;
  }
  
  .info .button {
    border: none;
    background-color: #f5c517;
    border: 1px solid #f5c517;
    padding: 10px 20px;
    color: black;
    font-weight: bold;
    font-size: 15px;
    outline: none;
    float: right;
    cursor: pointer;
    text-decoration: none;
    border-radius: 10px;
  }
  .info .button:hover {
    background-color: #fadb68;
    transition: all 0.3s;
  }
  
  .action_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .action_container i {
    color: #ccc;
    font-size: 20px;
    cursor: pointer;
  }
  
  .action_container i:hover {
    color: #b0514c;
  }
  .action_container i.is_favourite {
    color: #c00000;
  }
  </style>

<div class="movie-container">
    <div class="image-container">
        <img/>
    </div>

    <div class="info">
        <h3 class="title"></h3>
        <p>
            <slot/>
        </p>
        <div class="action_container">
            <i class="isFavourite fa fa-heart "></i>
            <a target="_blank" class="button">IMDb</a>
        </div>
    </div>
</div>
`;

class MovieCard extends HTMLElement{
    constructor(){
        super();

        this.isFavourite = false;
        this.attachShadow({mode : "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //Attribute Bilgilerini okuma...
        setTimeout(()=> { //web component daha hızlı çalıştığı için title ve img'i alamadı bu yüzden 100 milisaniye beklettik
            this.shadowRoot.querySelector("h3.title").innerHTML = this.getAttribute("title");
            this.shadowRoot.querySelector("img").src = this.getAttribute("poster");
            this.shadowRoot.querySelector(".button").setAttribute("href", `https://imdb.com/title/${this.getAttribute("imdbID")}`)
            if(this.getAttribute("isFavourite")=="true"){ //attribute'dan gelen her şey string geleceği için böyle yapılır
              this.isFavourite = true;
              this.shadowRoot.querySelector(".isFavourite").classList.add("is_favourite");
            }
        },100);

    }

    favToggle(){
        this.isFavourite = !this.isFavourite;
        if(this.isFavourite){
            this.shadowRoot.querySelector(".isFavourite").classList.add("is_favourite");
        }else{
            this.shadowRoot.querySelector(".isFavourite").classList.remove("is_favourite");
        }
    }

    connectedCallback(){
        this.shadowRoot.querySelector(".isFavourite").addEventListener("click", () => this.favToggle())
    }
    disconnectedCallback(){
        this.shadowRoot.querySelector(".isFavourite").removeEventListener("click", () => this.favToggle)
    }
}

window.customElements.define("movie-card",MovieCard);