

//VARIABLE DECLARATIONS
const modalWindow = document.getElementById('add-modal')
const addMovieButton = document.querySelector("header button")
const deleteModal = document.getElementById('delete-modal')
const deletePassive = document.querySelector('div#delete-modal div.modal__actions .btn--passive')
const deleteDanger = document.querySelector('div#delete-modal div.modal__actions .btn--danger')
var movieItem = document.getElementById('movie-list')///look up

const tagMovieList = document.getElementById("movie-list")

const movieTitle = document.getElementById('title')
const movieImage = document.getElementById('image-url')
const movieRate = document.getElementById('rating')

const backdrop=document.getElementById('backdrop');
const addMovieBtn = document.getElementsByClassName("btn--success")
const cancelMovieBtn = document.getElementsByClassName("btn--passive")
const cardPersonalMovie = document.getElementById('entry-text')

const movieList = [] // list of all movies added
const tagList = []

//BUTTONS ACTIONS

const toggleCancel = () => {
  toggleMovieModal()
}

toggleBackdrop = () => {
  backdrop.classList.toggle('visible')
}
togglehandler = (modal) => {
  modal.classList.toggle('visible') //toggle - add class if not present, remove it in case it is
  toggleBackdrop()
}
const toggleMovieModal = () => {
  togglehandler(modalWindow)
}

const toggleDeleteModal = () => {
  togglehandler(deleteModal)
}

const toggleCancelDelete = () => {
  toggleDeleteModal()
}
//OBJECT HANDLING

inputHandler = () => {
  const titleValue = movieTitle.value
  const imageValue = movieImage.value
  var rateValue = movieRate.value

  if (titleValue.trim() === "" || imageValue.trim() === "" || rateValue.trim() === "" || rateValue > 5 || rateValue < 1) {
    alert("valores invalidos")
  }
  else {


    const movie = {
      id: Math.random().toString(),
      title: titleValue,
      rating: rateValue,
      image: imageValue
    }
    movieList.push(movie)
    toggleMovieModal()

    movieTitle.value = ""
    movieImage.value = ""
    movieRate.value = ""

    return movie
  }
}

tagHandle = (tag, classValue, textTag) => {
  var tag = document.createElement(tag);
  if (textTag.trim() !== "") {
    const text = document.createTextNode(textTag);
    tag.appendChild(text)
  }
  if (classValue.trim() !== "") {
    tag.setAttribute("class", classValue)
  }
  return tag;
}

createMovie = () => {
  const movie = inputHandler()

  const movieElement = tagHandle("li", "movie-element", "")

  movieElement.className = "movie-element";
  movieElement.innerHTML = `
    <div class='movie-element__image'>
        <img src="${movie.image}" alt="${movie.title}" />
    </div>
    <div class="movie-element__info">
        <h2>${movie.title}</h2>
        <p>${movie.rating}/5</p>
    </div>
    `
  movieElement.addEventListener("click", deleteMovieHandler.bind(null, movie.id));


  return movieElement




}

const saveMovie = () => {


  const movieElement = createMovie()

  tagMovieList.appendChild(movieElement)


  toggleMovieModal()
  toggleCancel()
  handleCard()
}

const deleteMovie = (movieId) => {

  let index = 0;
  for (let movie of movieList) {
    if (movieId === movie.id) {
      break;
    }
    index++;
  }
  movieList.splice(index, 1);
  tagMovieList.children[index].remove();
  toggleDeleteModal()


}

const deleteMovieHandler = (movieId) => {
  toggleDeleteModal();
  deleteDanger.addEventListener('click', ()=>{
    deleteMovie(movieId)
  })
  

}



handleCard = () => { //Determine if card with id -> entry-text, should/shouldn`t display
  if (movieList.length !== 0) {
    cardPersonalMovie.style.display = "none"

  }

}
//Event listeners

addMovieButton.addEventListener('click', toggleMovieModal)

addMovieBtn[0].addEventListener('click', saveMovie)
cancelMovieBtn[0].addEventListener('click', toggleCancel)





//deleteDanger.addEventListener('click', deleteMovieHandler)
deletePassive.addEventListener('click', toggleCancelDelete)