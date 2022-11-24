//Variables

const reviewSlider = document.querySelector(".reviews");
const reviewBtns = document.querySelectorAll(".review-btn");
const reviews = [...document.querySelectorAll(".review")];
const indicators = [...document.querySelectorAll(".indicator")];
let isMoving;
// Auxiliar para prevenir cambios muy rápidos en el slider
let currentIndex = 1;
//El índice 1 es el segundo item de nuestro array de reviews
// que contiene la primer review que queremos mostrar por eso lo seteamos como 1.
// Recordar que en la posición 0 está repetida la última review.

//Functions

function showActiveIndicator() {
  indicators.forEach((ind) => ind.classList.remove("active"));
  let activeIndicator;
  if (currentIndex === 0 || currentIndex === reviews.length - 2) {
    activeIndicator = indicators.length - 1;
  } else if (currentIndex === reviews.length - 1 || currentIndex === 1) {
    activeIndicator = 0;
  } else {
    activeIndicator = currentIndex - 1;
  }
  indicators[activeIndicator].classList.add("active");
}

function moveSlider() {
  reviewSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
  showActiveIndicator();
}

function handleReviewBtnClick(e) {
  if (isMoving) {
    return;
  }
  isMoving = true;
  e.currentTarget.id === "next" ? currentIndex++ : currentIndex--;
  moveSlider();
}

function handleIndicatorClick(e) {
  if (isMoving) {
    return;
  }
  isMoving = true;
  currentIndex = indicators.indexOf(e.target) + 1;
  moveSlider();
}

//Event listeners

//Esto agarra cada uno de los botones de izq. y der. y les agrega
// un event listener que se dispara con cada click y llama a la función
// handleReviewBtnClick. Esta función se encarga de deslizar el slider
reviewBtns.forEach((btn) => {
  btn.addEventListener("click", handleReviewBtnClick);
});

// Este event listener trabaja en conjunto con los botones circulares del
// slider para que podamos seleccionar la review que queremos ver
indicators.forEach((ind) => {
  ind.addEventListener("click", handleIndicatorClick);
});

// Esto trabaja con el movimiento lateral del slider y también ajusta
// el tiempo de transición para las reviews duplicadas del principio y final
reviewSlider.addEventListener("transitionend", () => {
  isMoving = false;
  if (currentIndex === 0) {
    currentIndex = reviews.length - 2;
    reviewSlider.style.transitionDuration = "1ms";
    return moveSlider();
  }
  if (currentIndex === reviews.length - 1) {
    currentIndex = 1;
    reviewSlider.style.transitionDuration = "1ms";
    return moveSlider();
  }
  reviewSlider.style.transitionDuration = "300ms";
});
