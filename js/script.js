const slider = document.getElementById("slider");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slides = document.querySelectorAll(".slider-image");
const bottom = document.getElementById("bottom");

let currentSlideIndex = 0;
const totalSlides = slides.length;
const paginationCircles = [];

// Функція для визначення актуальної ширини слайда
function getSlideWidth() {
    return slides[0].clientWidth; // або slider.offsetWidth / totalSlides
}

// Створення пагінації
function createPaginationCircle(index) {
    const div = document.createElement("div");
    div.className = "pagination-circle";
    if (index === 0) div.classList.add("active");
    div.addEventListener("click", () => changeSlide(index));
    bottom.appendChild(div);
    paginationCircles.push(div);
}

function addPagination() {
    slides.forEach((_, index) => createPaginationCircle(index));
}

function updatePagination() {
    paginationCircles.forEach((circle, index) => {
        if (index === currentSlideIndex) {
            circle.classList.add("active");
        } else {
            circle.classList.remove("active");
        }
    });
}

function changeSlide(index) {
    currentSlideIndex = index;
    const slideWidth = getSlideWidth();
    slider.style.transform = `translateX(${-currentSlideIndex * slideWidth}px)`;
    updatePagination();
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    changeSlide(currentSlideIndex);
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    changeSlide(currentSlideIndex);
}

// Слухачі подій
arrowRight.addEventListener("click", nextSlide);
arrowLeft.addEventListener("click", previousSlide);

// Додати адаптацію при зміні розміру екрана
window.addEventListener("resize", () => changeSlide(currentSlideIndex));

// Ініціалізація
addPagination();
