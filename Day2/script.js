document.addEventListener("DOMContentLoaded", function () {
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const carouselImages=document.querySelector(".imageContainer")

const imageWidth=500;
let num=document.getElementsByClassName("slide");
console.log(num);

slideIndex=1;
showSlides(slideIndex);

function showSlides(n) {
  let num=document.getElementsByClassName("slide");
  if (n < 1) {slideIndex = num.length}
  if (n > num.length) {slideIndex = 1}
  for (i = 0; i < num.length; i++) {
    num[i].style.width = "0%";  
  }
  num[slideIndex-1].style.width = "100%";
  }

function handleClick(event) {
  const clickedButton = event.target;

  if (clickedButton.classList.contains("prev")) {
    console.log("Previous Button Clicked");// Previous button clicked
    console.log(slideIndex);
    showSlides(slideIndex -=1);
  } else if (clickedButton.classList.contains("next")) {
    // Next button clicked
    showSlides(slideIndex +=1);
    console.log("Next Button Clicked");
    console.log(slideIndex);
    // Add your logic for handling the next button click here
  }
}
prevBtn.addEventListener("click", handleClick);
nextBtn.addEventListener("click", handleClick);
})

button.addEventListener("click", handleClick);
